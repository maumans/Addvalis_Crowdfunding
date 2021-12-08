<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Critere;
use App\Models\Programme;
use App\Models\Region;
use App\Models\Secteur;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
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
    public function store(Request $request,User $user)
    {
        $request->validate([
            "titre" =>"required",
            "description" =>"required",
            "dateDebut" =>"required|date",
            "dateFin" =>"required|date",
            "details" =>"required",
            "image" =>"required"
        ]);

        $nom=$request->file("image")->store("ProgrammeImage","public");
        $image=Storage::url($nom);


        $programme=Programme::create([
            "titre" =>$request->titre,
            "description" =>$request->description,
            "dateDebut" =>$request->dateDebut,
            "dateFin" =>$request->dateFin,
            "details" =>$request->details,
            "image" =>$image
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

        return Inertia::render("Admin/Programme/Show",["programme"=>$programme,"criteres"=>$criteres]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
