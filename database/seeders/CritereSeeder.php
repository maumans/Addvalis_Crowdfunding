<?php

namespace Database\Seeders;

use App\Models\Critere;
use App\Models\GenreCritere;
use App\Models\TypeCritere;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CritereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('criteres')->delete();

        $critere=Critere::create([
            "description"=>"Lisibilité du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","selection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();

        $critere = Critere::create([
            "description"=>"Pertinence du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","preselection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();

        $critere=Critere::create([
            "description"=>"Impact du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","selection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();

        $critere = Critere::create([
            "description"=>"Cout de la realisation du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","preselection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","note")->first())->save();

        $critere=Critere::create([
            "description"=>"realisable",
        ])->typeCritere()->associate(TypeCritere::where("libelle","selection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","choix")->first())->save();

        $critere = Critere::create([
            "description"=>"Benefique",
        ])->typeCritere()->associate(TypeCritere::where("libelle","preselection")->first());

        $critere->genreCritere()->associate(GenreCritere::where("libelle","choix")->first())->save();

    }
}
