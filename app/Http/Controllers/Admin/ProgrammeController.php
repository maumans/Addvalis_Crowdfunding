<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Critere;
use App\Models\Programme;
use App\Models\Region;
use App\Models\Secteur;
use App\Models\User;
use App\Models\Ville;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgrammeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $programmes=Programme::orderBy("created_at","desc")->get();

        foreach($programmes as $p)
        {
            $p->nombreProjets=$p->projets->count();
        }
        return Inertia::render("Admin/Programme/Index",["programmes"=>$programmes]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $criteresPreselections=Critere::whereRelation("typeCritere","libelle","preselection")->get();
        $criteresSelections=Critere::whereRelation("typeCritere","libelle","selection")->get();
        $secteurs=Secteur::all();
        $regions=Region::all();

        return Inertia::render("Admin/Programme/Create",["criteresPreselections"=>$criteresPreselections,"criteresSelections"=>$criteresSelections,"secteurs"=>$secteurs,"regions"=>$regions]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $user)
    {
        $request->validate([
            "titre" =>"required|max:100",
            "description" =>"required|min:10|max:255",
            "dateDebut" =>"required|date",
            "dateFin" =>"required|date|after_or_equal:dateDebut",
            "details" =>"required",
            "image" =>"required",
            "noteMinPreselection"=>$request->criteresPreselections?"required":"",
            "noteMinSelection"=>$request->criteresSelections?"required":"",
        ],
        [
            "titre.required"=>"Le titre est requis",
            "titre.max"=>"100 caractères max pour titre ",
            "description.required"=>"La description est requise",
            "description.min"=>"10 caractères min pour titre",
            "description.max"=>"255 caractères max pour titre",
            "dateDebut.required"=>"La date de debut est requise",
            "dateDebut.date"=>"Une date est requise",
            "dateFin.required"=>"La date de fin est requise",
            "dateFin.date"=>"Une date est requise",
            "dateFin.after_or_equal"=>"La date de fin doit est superieure à la date de debut",
            "details.required"=>"Les details sont requis",
            "image.required"=>"L'image est requise",
            "noteMinPreselection.required"=>"La note minimale de preselection est requise",
            "noteMinSelection.required"=>"La note minimale de selection est requise",
        ]);

        $nom=$request->file("image")->store("ProgrammeImage","public");
        $image=Storage::url($nom);


        $programme=Programme::create([
            "titre" =>$request->titre,
            "description" =>$request->description,
            "dateDebut" =>$request->dateDebut,
            "dateFin" =>$request->dateFin,
            "details" =>$request->details,
            "image" =>$image,
            "noteMinPreselection"=>$request->criteresPreselections ? $request->noteMinPreselection:"",
            "noteMinSelection"=>$request->criteresSelections ? $request->noteMinSelection:""
        ]);

        foreach($request->criteresPreselections as $key => $value)
        {
            $programme->criteres()->syncWithoutDetaching(Critere::find($value["id"]));

        }

        foreach($request->criteresSelections as $key => $value)
        {
            $programme->criteres()->syncWithoutDetaching(Critere::find($value["id"]));

        }

        foreach($request->regions as $key => $value)
        {
            $programme->regions()->syncWithoutDetaching(Region::find($value["id"]));
        }

        foreach($request->secteurs as $key => $value)
        {
            $programme->secteurs()->syncWithoutDetaching(Secteur::find($value["id"]));

        }



        return redirect()->route('admin.programme.index',Auth::id())->with("success","Programme ajouté avec succès");

    }

    /**
     * Display the specified resource.
     *
     * @param $userId
     * @param $programmeId
     * @return \Inertia\Response
     */
    public function show($userId, $programmeId)
    {
        $programme = Programme::where("id",$programmeId)->with(["criteres","regions","secteurs"])->first();
        $criteres = $programme->criteres()->with("typeCritere")->get();

        $programme->joursRestant=$programme->dateFin>=Date::now()?Carbon::parse($programme->dateFin)->diffInDays(Date::now()):0;

        return Inertia::render("Admin/Programme/Show",["programme"=>$programme,"criteres"=>$criteres]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($userId ,$programmeId)
    {
        $criteresPreselections=Critere::whereRelation("typeCritere","libelle","preselection")->get();
        $criteresSelections=Critere::whereRelation("typeCritere","libelle","selection")->get();
        $secteurs=Secteur::all();
        $regions=Region::all();
        $programme=Programme::where("id",$programmeId)->with(["secteurs","regions",])->first();
        $preselections=$programme->criteres()->whereRelation("typeCritere","libelle","preselection")->get();
        $selections=$programme->criteres()->whereRelation("typeCritere","libelle","selection")->get();

        return Inertia::render("Admin/Programme/Edit",["criteresPreselections"=>$criteresPreselections,"criteresSelections"=>$criteresSelections,"secteurs"=>$secteurs,"regions"=>$regions,"programme"=>$programme,"selections"=>$selections,"preselections"=>$preselections]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $userId, Programme $programme)
    {

        $request->validate([
            "programme.titre" =>"required|max:100",
            "programme.description" =>"required|min:1|max:255",
            "programme.dateDebut" =>"required|date",
            "programme.dateFin" =>"required|date|after_or_equal:programme.dateDebut",
            "programme.details" =>"required",
            "programme.noteMinPreselection"=>count($request->programme["criteresPreselections"])!=0 ?"required":"",
            "programme.noteMinSelection"=>count($request->programme["criteresSelections"])!=0 ?"required":"",
        ],
            [
                "programme.titre.required"=>"Le titre est requis",
                "programme.titre.min"=>"100 caractères max pour le titre",
                "programme.description.required"=>"La description est requise",
                "programme.description.min"=>"10 caractères min pour le description",
                "programme.description.max"=>"200 caractères max pour le description",
                "programme.dateDebut.required"=>"La date de debut est requise",
                "programme.dateDebut.date"=>"Une date est requise",
                "programme.dateFin.required"=>"La date de fin est requise",
                "programme.dateFin.date"=>"Une date est requise",
                "programme.dateFin.after_or_equal"=>"La date de fin doit est superieure à la date de debut",
                "programme.details.required"=>"Les details sont requis",
                "programme.noteMinPreselection.required"=>"La note minimale de preselection est requise",
                "programme.noteMinSelection.required"=>"La note minimale de selection est requise",
            ]
        );


        if($request->programme["image"] !== null)
        {
            $nom=$request->file("programme.image")->store("ProgrammeImage","public");
            $image=Storage::url($nom);
        }

        $programme->titre =$request->programme["titre"];
        $programme->description =$request->programme["description"];
        $programme->dateDebut =$request->programme["dateDebut"];
        $programme->dateFin = $request->programme["dateFin"];
        $programme->details = $request->programme["details"];
        $request->programme["image"]!==null &&  $programme->image = $image;
        $programme->noteMinPreselection =count($request->programme["criteresPreselections"])!=0 ? $request->programme["noteMinPreselection"]:"";
        $programme->noteMinSelection = count($request->programme["criteresSelections"])!=0 ? $request->programme["noteMinSelection"]:"";

        $preselections=$programme->criteres()->whereRelation("typeCritere","libelle","preselection")->get();
        $programme->criteres()->detach($preselections);
        foreach($request->programme["criteresPreselections"] as $key => $value)
        {
            $programme->criteres()->syncWithoutDetaching(Critere::find($value["id"]));
        }

        $selections=$programme->criteres()->whereRelation("typeCritere","libelle","selection")->get();
        $programme->criteres()->detach($selections);

        foreach($request->programme["criteresSelections"] as $key => $value)
        {
            $programme->criteres()->syncWithoutDetaching(Critere::find($value["id"]));
        }

        $programme->regions()->detach();
        foreach($request->programme["regions"] as $key => $value)
        {
            $programme->regions()->syncWithoutDetaching(Region::find($value["id"]));
        }

        $programme->secteurs()->detach();
        foreach($request->programme["secteurs"] as $key => $value)
        {
            $programme->secteurs()->syncWithoutDetaching(Secteur::find($value["id"]));
        }

        $programme->save();


        return redirect()->back()->with("success", "programme modifié avec succès");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($userId,Programme $programme)
    {
        $programme->delete();

        return redirect()->back()->with("success", "programme supprimé avec succès");
    }
}
