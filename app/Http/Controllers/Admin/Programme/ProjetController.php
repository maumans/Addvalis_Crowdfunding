<?php

namespace App\Http\Controllers\Admin\Programme;

use App\Http\Controllers\Controller;
use App\Models\Programme;
use App\Models\Projet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request,$user, Programme $programme)
    {
        $projets=$programme->projets()->orderBy("created_at","desc")->with("user")->get();

        return Inertia::render("Admin/Programme/Projet/Index",["programme"=>$programme,"projets"=>$projets,"page"=>$request->page]);
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request,$userId, Programme $programme,Projet $projet)
    {
        foreach($request->critereValidation as $key=>$value)
        {
            $projet->criteres()->syncWithoutDetaching([$key=>["note"=>$value,"choix"=>$value]]);
        }

        $programme->projets()->syncWithoutDetaching([$projet->id=>["noteTotalePreselection"=>$request->noteTotalePreselection,"noteTotaleSelection"=>$request->noteTotaleSelection]]);
        $projet->etape=$request->etape;
        $projet->save();

        if($request->etape=="attente")
        {
            $preselec=0;
            $selec=0;
            $etape="";
            foreach($programme->criteres as $critere)
            {
                if($critere->typeCritere->libelle=="preselection")
                {
                    $preselec=1;
                }
                if($critere->typeCritere->libelle=="selection")
                {
                    $selec=1;
                }
                $projet->criteres()->syncWithoutDetaching([$critere->id=>["note"=>"","choix"=>false]]);
            }
            if($preselec==1)
            {
                $etape="preselection";
            }
            else if($selec==1)
            {
                $etape="selection";
            }
            else
            {
                $etape="valide";
            }

            $projet->etape=$etape;
            $projet->save();
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($userId,Programme $programme,Projet $projet)
    {
        $projet->delete();
        return redirect()->route('admin.programme.projet.index',[$userId,$programme->id])->with("success", "projet supprimé avec succès");
        //dd($projet,$programme);
    }
}
