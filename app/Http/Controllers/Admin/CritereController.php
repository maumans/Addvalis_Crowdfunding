<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Critere;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CritereController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $criteres=Critere::all();
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$userId)
    {
        $request->validate([
            "description" =>"required"
        ]);
        Critere::create([
            "description" =>$request->description
        ]);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user,Critere $critere)
    {
        $request->validate([
            "description" =>"required"
        ]);

        $critere->description = $request->description;
        $critere->save();

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
