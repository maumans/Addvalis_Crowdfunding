<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
    public function index()
    {
        $projets =Projet::where("etat","valide")->orderBy("updated_at","desc")->get();

         return Inertia::render("Admin/Projet/Index",["projets"=>$projets]);
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
     * @param User $user
     * @param Projet $projet
     * @return \Inertia\Response
     */
    public function show( $userId, $projetId)
    {
        $projet=Projet::find($projetId);
        $user=User::find($userId);

        $contributeurs=$projet->contributeurs->count();

        $montantFinance=0;
        foreach($projet->contributeurs as $c)
        {
            $montantFinance=$montantFinance+$c->pivot->montant;
        }

        $pourcentage=$montantFinance*100/+$projet->montantRechercher;

        return Inertia::render("Admin/Projet/Show",["projet"=>$projet,"createur"=>$user,"contributeurs"=>$contributeurs,"pourcentage"=>$pourcentage,"montantFinance"=>$montantFinance]);
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(string $user,Projet $projet)
    {
        $projet->delete();
        return redirect()->back()->with("success","Projet supprimé");
    }

    public function validationIndex()
    {

        $projets=Projet::where("etat","attente")->orderBy("created_at","desc")->get();

        return Inertia::render("Admin/Projet/Validation/Index",["projets"=>$projets]);
    }

    public function validationShow( $userId, $projetId)
    {
        $projet=Projet::find($projetId);
        $user=User::find($userId);

        $contributeurs=$projet->contributeurs->count();

        $montantFinance=0;
        foreach($projet->contributeurs as $c)
        {
            $montantFinance=$montantFinance+$c->pivot->montant;
        }

        $pourcentage=$montantFinance*100/+$projet->montantRechercher;

        return Inertia::render("Admin/Projet/Validation/Show",["projet"=>$projet,"createur"=>$user,"contributeurs"=>$contributeurs,"pourcentage"=>$pourcentage,"montantFinance"=>$montantFinance]);
    }

    public function valider(int $userId,int $projetId)
    {
        $projet=Projet::find($projetId);
        $projet->Etat="valide";
        $projet->save();

        $projets =Projet::where("etat","valide")->orderBy("updated_at","desc")->get();

        return Inertia::render("Admin/Projet/Index",["projets"=>$projets])->with("success","Projet validé avec succès");
    }

    public function validationDestroy($user,Projet $projet)
    {
        $projet->delete();
        return redirect()->route("admin.projet.validation.index",Auth::id())->with("success","Projet retiré avec succès");
    }
}
