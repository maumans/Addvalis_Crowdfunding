<?php

namespace Database\Seeders;

use App\Models\GenreCritere;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreCritereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("genre_criteres")->delete();

        GenreCritere::create([
            "libelle"=>"choix",
        ]);
        GenreCritere::create([
            "libelle"=>"note",
        ]);
    }
}
