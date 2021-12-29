<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Adresse;
use App\Models\Programme;
use App\Models\Region;
use App\Models\Ville;
use Illuminate\Http\Request;


use App\Models\Projet;
use App\Models\Secteur;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $projets=Projet::where("user_id",Auth::user()->id)->orderBy("created_at","desc")->get(["id","titre","description","image"]);

        return Inertia::render("User/Projet/Index",["projets"=>$projets]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $secteurs=Secteur::all();
        $regions=Region::with("villes")->get();
        $villes=Ville::with("region")->get();
        return Inertia::render("User/Projet/Create",["secteurs"=>$secteurs,"regions"=>$regions,"villes"=>$villes]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            "titre"=>"required|string",
            "description"=>"required|string|max:100",
            "montantInitial"=>"required|integer",
            "montantRechercher"=>"required|integer",
            "dateDebut"=>"required|date",
            "dateFin"=>"required|date|after_or_equal:dateDebut",
            "details"=>"required",
            "secteur"=>"required|gt:0",
            "image"=>"required",
            "telephone"=>"required",
            "statusJuridique"=>"required",
        ],
        [
            "titre.required"=>"Le titre est requis",
            "description.required"=>"La description est requise",
            "montantInitial.required"=>"Le montant initial est requis",
            "montantRechercher.required"=>"Le montant recherché est requis",
            "dateDebut.required"=>"La date de debut est requise",
            "dateFin.required"=>"La date de fin est requise",
            "dateFin.after_or_equal"=>"La date de fin doit est superieure à la date de debut",
            "details.required"=>"Les details sont requis",
            "secteur.required"=>"Le secteur est requis",
            "secteur.gt"=>"Le secteur est requis",
            "image.required"=>"L'image est requise",
            "description.max"=>"",
            "montantInitial.integer"=>"Le montant initial est un nombre",
            "montantRechercher.integer"=>"Le montant recherché est un nombre",
            "dateFin.gte"=>"La date de fin doit etre supérieure à la date de debut",
            "telephone.required"=>"Le numero de telephone est requis",
            "statusJuridique.required"=>"Le status juridique est requis"
        ]
        );

        $nom=$request->file("image")->store("ProjetImage","public");
        $imgUrl=Storage::url($nom);

        $projet=Projet::create([
            "titre"=>$request->titre,
            "description"=>$request->description,
            "montantInitial"=>$request->montantInitial,
            "montantRechercher"=>$request->montantRechercher,
            "dateDebut"=>$request->dateDebut,
            "dateFin"=>$request->dateFin,
            "details"=>$request->details,
            "secteur_id"=>$request->secteur,
            "user_id"=>Auth::user()->id,
            "image"=>$imgUrl,
            "etat"=>"attente",
            "etape"=>"preselection",
            "telephone"=>$request->telephone,
            "statusJuridique"=>$request->statusJuridique["libelle"],
        ]);

        $adresse=Adresse::create()->ville()->associate(Ville::find($request->ville["id"]))->save();
        $projet->adresse()->associate($adresse)->save();

        if($request->programmeId)
        {
            $programme=Programme::where("id",$request->programmeId)->with("regions","criteres","secteurs")->first();
            if($request->region)
                $region=$programme->regions->where("libelle",$request->region["libelle"]);

            $secteur=$programme->secteurs()->find($request->secteur);

            if($request->region==null)
            {
                $region=$programme->regions()->whereRelation("villes","id",Ville::find($request->ville["id"])->region->id)->first();
            }

            if($region && $secteur)
            {
                $programme->projets()->syncWithoutDetaching($projet);
            }

            foreach($programme->criteres as $critere)
            {
                $projet->criteres()->syncWithoutDetaching([$critere->id=>["note"=>"","choix"=>false]]);
            }

        }

        return Inertia::render("User/Projet/Attente")->with("success","Projet crée");
    }

    /**
     * Display the specified resource.
     *
     * @param Projet $projet
     * @return \Inertia\Response
     */
    public function show(User $user,Projet $projet)
    {
        $user=$projet->user;
        $contributeurs=$projet->contributeurs->count();

        $montantFinance=0;
        foreach($projet->contributeurs as $c)
        {
            $montantFinance=$montantFinance+$c->pivot->montant;
        }

        $pourcentage=$montantFinance*100/+$projet->montantRechercher;

        return Inertia::render("User/Projet/Show",["projet"=>$projet,"createur"=>$user,"contributeurs"=>$contributeurs,"pourcentage"=>$pourcentage,"montantFinance"=>$montantFinance]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($user,Projet $projet)
    {
        $regions=Region::with("villes")->get();
        $villes=Ville::with("region")->get();
        $secteurs = Secteur::all();
        $secteur=$projet->secteur;
        $projet->adresse->ville->region;
        return Inertia::render("User/Projet/Edit",["projet"=>$projet,"secteur"=>$secteur,"secteurs"=>$secteurs,"regions"=>$regions,"villes"=>$villes]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $user,Projet $projet)
    {
        $request->validate([
            "projet.titre"=>"required|string",
            "projet.description"=>"required|string|max:100",
            "projet.montantInitial"=>"required|integer",
            "projet.montantRechercher"=>"required|integer",
            "projet.dateDebut"=>"required|date",
            "projet.dateFin"=>"required|date|after_or_equal:projet.dateDebut",
            "projet.details"=>"required",
            //"projet.secteur"=>"required",
            //"image"=>"required"
        ],
        [
            "projet.titre.required"=>"Le titre est requis",
            "projet.description.required"=>"La description est requise",
            "projet.montantInitial.required"=>"Le montant initial est requis",
            "projet.montantRechercher.required"=>"Le montant recherché est requis",
            "projet.dateDebut.required"=>"La date de debut est requise",
            "projet.dateFin.required"=>"La date de fin est requise",
            "projet.dateFin.after_or_equal"=>"La date de fin doit est superieure à la date de debut",
            "projet.details.required"=>"Les details sont requis",
            "projet.secteur.required"=>"Le secteur sont requis",
            "projet.image.required"=>"L'image est requise",
            "projet.description.max"=>"",
            "projet.montantInitial.integer"=>"Le montant initial est un nombre",
            "projet.montantRechercher.integer"=>"Le montant recherché est un nombre",
            "projet.dateFin.gte"=>"La date de fin doit etre supérieure à la date de debut",
        ]);

       if($request->projet["image"] !== null)
       {
           $nom=Storage::disk()->put("public/ProjetImage",$request->projet["image"]);
           $imgUrl=Storage::url($nom);
           $projet->image=$imgUrl;

           Storage::disk('public')->delete(explode("/storage/",$request->projet["prevImage"])[1]);

       }


       if ($request->projet["secteur"])
       {
           $projet->secteur_id=$request->projet["secteur"];
       }

       $projet->titre=$request->projet["titre"];
       $projet->description=$request->projet["description"];
       $projet->dateDebut=$request->projet["dateDebut"];
       $projet->dateFin=$request->projet["dateFin"];
       $projet->montantInitial=$request->projet["montantInitial"];
       $projet->montantRechercher=$request->projet["montantRechercher"];
       $projet->details=$request->projet["details"];

       $projet->save();



        return redirect()->route("user.projet.edit",[Auth::id(),$projet->id])->with("success","Projet modifié avec success");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($user,Projet $projet)
    {
        $projet->delete();

        return redirect()->route('user.projet.index',Auth::id())->with("success","Projet supprimé avec succès");

    }

    public function uploadImage(Request $request)
    {
        $nom = request()->file('file')->store('uploadEditorImage', 'public');

        $imgUrl=Storage::url($nom);

        return ["location"=> $imgUrl];
    }
}
