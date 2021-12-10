<?php

namespace App\Http\Controllers\Admin\Programme;

use App\Http\Controllers\Controller;
use App\Models\Programme;
use App\Models\Projet;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index($user, Programme $programme)
    {
        $projets=$programme->projets()->orderBy("created_at","desc")->with("user")->get();
       return Inertia::render("Admin/Programme/Projet/Index",["programme"=>$programme,"projets"=>$projets]);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($user,Programme $programme,Projet $projet)
    {
        $projet->user;
        return Inertia::render("Admin/Programme/Projet/Show",["projet"=>$projet,"programme"=>$programme,"criteres"=>$projet->criteres]);
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
    public function update(Request $request,$userId, Programme $programme,Projet $projet)
    {
        foreach($request->all() as $key=>$value)
        {
            $projet->criteres()->syncWithoutDetaching([$key=>["note"=>$value,"choix"=>$value]]);

        }

        return redirect()->back();
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
