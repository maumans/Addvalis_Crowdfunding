<?php

namespace Database\Seeders;

use App\Models\TypeCritere;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeCritereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("type_criteres")->delete();

        TypeCritere::create([
            "libelle"=>"choix"
        ]);
        TypeCritere::create([
            "libelle"=>"note"
        ]);

        TypeCritere::create([
            "libelle"=>"preselection"
        ]);

        TypeCritere::create([
            "libelle"=>"selection"
        ]);

        TypeCritere::create([
            "libelle"=>"region"
        ]);

        TypeCritere::create([
            "libelle"=>"secteur"
        ]);

        TypeCritere::create([
            "libelle"=>"ville"
        ]);
    }
}
