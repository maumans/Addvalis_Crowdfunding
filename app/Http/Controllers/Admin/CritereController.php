<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Critere;
use App\Models\GenreCritere;
use App\Models\TypeCritere;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CritereController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $criteres=Critere::with("genreCritere","typeCritere")->get();


        return Inertia::render("Admin/Critere/Index",["criteres"=>$criteres]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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
            "description" =>"required",
            "noteMaximale" =>$request->genreCritere?"":"required|gt:0"
        ]);
        $critere=Critere::create([
            "description" =>$request->description,
            "notemax"=> $request->genreCritere?null:$request->noteMaximale,

        ]);
        $request->genreCritere?$critere->genreCritere()->associate(GenreCritere::where("libelle","choix")->first())->save():$critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();
        $request->typeCritere?$critere->typeCritere()->associate(TypeCritere::where("libelle","selection")->first())->save():$critere->genreCritere()->associate(TypeCritere::where("libelle","preselection")->first())->save();

        return redirect()->back()->with("success","critere ajouté avec succès");
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
    public function update(Request $request, $user,Critere $critere)
    {
        $request->validate([
            "description" =>"required",
            "noteMaximale" =>$request->genreCritere?"":"required|gt:0"
        ]);

        $critere->description = $request->description;
        $critere->notemax = $request->genreCritere?null:$request->noteMaximale;
        $critere->save();
        $request->genreCritere?$critere->genreCritere()->associate(GenreCritere::where("libelle","choix")->first())->save():$critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();
        $request->typeCritere?$critere->typeCritere()->associate(TypeCritere::where("libelle","selection")->first())->save():$critere->typeCritere()->associate(TypeCritere::where("libelle","preselection")->first())->save();

        return redirect()->back()->with('success', "critere modifié avec succès");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $user
     * @param Critere $critere
     * @return \Illuminate\Http\Response
     */
    public function destroy($user,Critere $critere)
    {
        $critere->delete();

        return redirect()->back()->with("success", "critere supprimé avec succès");
    }
}
