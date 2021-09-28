<?php

namespace Database\Seeders;

use App\Models\Secteur;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SecteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("secteurs")->delete();
        Secteur::create(
            [
                "libelle"=>"art"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"technologie"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"commerce"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"divertissement"
            ]
        );

        Secteur::create(
            [
                "libelle"=>"sport"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"cinema"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"tourisme"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"dance"
            ]
        );
        Secteur::create(
            [
                "libelle"=>"musique"
            ]
        );
    }
}
