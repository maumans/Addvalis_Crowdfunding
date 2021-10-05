<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\Projet;
use App\Models\Secteur;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            "titre"=>"required|string",
            "description"=>"required|string|max:135",
            "montantInitial"=>"required|integer",
            "montantRechercher"=>"required|integer",
            "dateDebut"=>"required|date",
            "dateFin"=>"required|date",
            "details"=>"required",
            "secteur"=>"required"
        ]);

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
            "image"=>$imgUrl
        ]);

        return redirect()->route("user.projet.index",Auth::user()->id)->with("success","Projet crée");
    }

    /**
     * Display the specified resource.
     *
     * @param Projet $projet
     * @return \Inertia\Response
     */
    public function show(User $user,Projet $projet)
    {
        return Inertia::render("User/Projet/Show", ["projet"=>$projet]);
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
