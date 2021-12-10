<?php

namespace App\Http\Controllers;

use App\Models\Adresse;
use App\Models\Contribution;
use App\Models\Projet;
use App\Models\Region;
use App\Models\Ville;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
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
        $projets=Projet::where("etat","valide")->orderBy('created_at',"desc")->with(["user","secteur","adresse"])->get();
        foreach($projets as $projet)
        {
            $projet->adresse->ville->region;
            $montantFinance=$projet->contributeurs()->sum("montant");
            $pourcentage=$montantFinance*100/$projet->montantRechercher;
            $projet->pourcentage=$pourcentage;

            $projet->joursRestant=$projet->dateFin>=Date::now()?Carbon::parse($projet->dateFin)->diffInDays(Date::now()):0;
            $projet->montantFinance=$montantFinance;

            $projet->like=$projet->likeurs->contains(Auth::user());
            $projet->enregistre=$projet->enregistreurs->contains(Auth::user());
        }
        $regions=Region::all();

        return Inertia::render("Projet/Index",["projets"=>$projets,"regions"=>$regions]);
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
    public function show(Projet $projet)
    {

        $user=$projet->user;
        $contributeurs=$projet->contributeurs->count();

        $montantFinance=$projet->contributeurs()->sum("montant");



        $projet->enregistre=$projet->enregistreurs->contains(Auth::user());


        $pourcentage=$montantFinance*100/$projet->montantRechercher;

        $contributeur=$projet->contributeurs()->where("user_id",Auth::id())->first();

        $projet->joursRestant=$projet->dateFin>=Date::now()?Carbon::parse($projet->dateFin)->diffInDays(Date::now()):0;


        return Inertia::render("Projet/Show",["projet"=>$projet,"createur"=>$user,"contributeurs"=>$contributeurs,"pourcentage"=>$pourcentage,"montantFinance"=>$montantFinance,"contributeur"=>$contributeur]);
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

    public function contribuer(Request $request)
    {
        $request->validate([
            "montant" =>"required|integer|min:10000|max:100000000"
        ],
        [
            "montant.required" =>"Le montant est requis",
            "montant.integer" =>"Le montant doit etre un entier",
            "montant.max" =>"Le montant max est 100.000.000",
            "montant.min" =>"Le montant min est 10.000",
        ]);

        $projet=Projet::find($request->projetId);
        $projet->contributeurs()->syncWithoutDetaching([auth()->user()->id=>["montant"=>$request->montant]]);
        return redirect()->back()->with('success', 'Vous avez contribué à ce projet avec succès');

    }
}
