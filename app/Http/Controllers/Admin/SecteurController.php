<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Secteur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecteurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $secteurs=Secteur::all();

        return Inertia::render("Admin/Secteur/Index",["secteurs"=>$secteurs]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request,$userId)
    {
        Secteur::create([
            "libelle"=>$request->libelle
        ]);
        return redirect()->back()->with("success","secteur ajouté avec succès");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $user,Secteur $secteur)
    {
        $request->validate([
            "libelle"=>"required"
        ]);

        $secteur->libelle = $request->libelle;
        $secteur->save();

        return redirect()->back()->with('success', "secteur modifié avec succès");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user,Secteur $secteur)
    {
        $secteur->delete();

        return redirect()->back()->with("success","secteur supprimé avec succès");
    }
}
