<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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
        $projets=Projet::where("user_id",Auth::user()->id)->orderBy("created_at","desc")->get();

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
        return Inertia::render("User/Projet/Create",["secteurs"=>$secteurs]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        //dd(strtotime($request->dateFin)-strtotime($request->dateDebut));
        $request->validate([
            "titre"=>"required|string",
            "description"=>"required|string|max:100",
            "montantInitial"=>"required|integer",
            "montantRechercher"=>"required|integer",
            "dateDebut"=>"required|date",
            "dateFin"=>"required|date|gte:dateDebut",
            "details"=>"required",
            "secteur"=>"required",
            "image"=>"required"
        ],
        [
            "titre.required"=>"Le titre est requis",
            "description.required"=>"La description est requise",
            "montantInitial.required"=>"Le montant initial est requis",
            "montantRechercher.required"=>"Le montant recherché est requis",
            "dateDebut.required"=>"La date de debut est requise",
            "dateFin.required"=>"La date de fin est requise",
            "details.required"=>"Les details sont requis",
            "secteur.required"=>"Le secteur sont requis",
            "image.required"=>"L'image est requise",
            "description.max"=>"100 caracteres max",
            "montantInitial.integer"=>"Le montant initial est un nombre",
            "montantRechercher.integer"=>"Le montant recherché est un nombre",
            "dateFin.gte"=>"La date de fin doit etre supérieure à la date de debut",


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
            "etat"=>"attente"
        ]);

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
