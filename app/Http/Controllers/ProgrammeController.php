<?php

namespace App\Http\Controllers;

use App\Models\Programme;
use App\Models\Region;
use App\Models\Secteur;
use App\Models\Ville;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Session;
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
        return Inertia::render("Programme/Index",["programmes"=>$programmes]);
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
     * @param $programmeId
     * @return \Inertia\Response
     */
    public function show($programmeId)
    {
        $programme = Programme::where("id",$programmeId)->with(["criteres","regions","secteurs","fichiers"])->first();

        $criteres = $programme->criteres()->with("typeCritere")->get();

        $programme->joursRestant=$programme->dateFin >= Date::now()?Carbon::parse($programme->dateFin)->diffInDays(Date::now()):0;

        return Inertia::render("Programme/Show",["programme"=>$programme,"criteres"=>$criteres]);
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

    public function createProject(Programme $programme)
    {
        $secteurs=Secteur::all();
        $regions=Region::with("villes")->get();
        $villes=Ville::with("region")->get();

        return Inertia::render("User/Projet/Create",["secteurs"=>$secteurs,"regions"=>$regions,"villes"=>$villes,"programmeId"=>$programme->id]);
    }
}
