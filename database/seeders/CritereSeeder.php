<?php

namespace Database\Seeders;

use App\Models\Critere;
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
            "description"=>"Lisibilité du projet"
        ]);
        Critere::create([
            "description"=>"Clarté du projet"
        ]);
        Critere::create([
            "description"=>"Pertinence du projet"
        ]);
        Critere::create([
            "description"=>"Realisation du projet"
        ]);
    }
}
