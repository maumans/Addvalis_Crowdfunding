<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SaveController extends Controller
{
    public function enregistrer(User $user,Projet $projet)
    {
        $projet->enregistreurs->contains(Auth::user())?$projet->enregistreurs()->detach(Auth::user()):
            $projet->enregistreurs()->syncWithoutDetaching(Auth::user());
        return redirect()->back();
    }

    public function index()
    {
        $projets =Auth::user()->enregistrer()->withCount("contributeurs")->get();

        foreach($projets as $p)
        {
            $p->like=$p->likeurs->contains(Auth::user());
            $p->enregistre=$p->enregistreurs->contains(Auth::user());

            $montantFinance=0;
            foreach($p->contributeurs as $c)
            {
                $montantFinance=$montantFinance+$c->pivot->montant;
            }
            $dd=new Datetime($p->dateDebut);
            $df=new Datetime($p->dateFin);

            $p->pourcentage=round($montantFinance*100/$p->montantRechercher);
            $p->joursRestant=$df->diff($dd)->days;
        }



        return Inertia::render('User/Projet/Save/Index',["projets"=>$projets]);
    }
}
