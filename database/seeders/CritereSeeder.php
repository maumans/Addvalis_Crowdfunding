<?php

namespace Database\Seeders;

use App\Models\Critere;
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

        Critere::create([
            "description"=>"Lisibilité du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","note")->first())->save();
        Critere::create([
            "description"=>"Clarté du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","note")->first())->save();
        Critere::create([
            "description"=>"Pertinence du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","note")->first())->save();
        Critere::create([
            "description"=>"Realisation du projet",
            "notemax"=>10
        ])->typeCritere()->associate(TypeCritere::where("libelle","note")->first())->save();
    }
}
