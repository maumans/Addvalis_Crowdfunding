<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("villes")->delete();
        ;
        Ville::create([
            "libelle"=>"Conakry"
        ])->region()->associate(Region::find(1))->save();

        Ville::create([
            "libelle"=>"Labé"
        ])->region()->associate(Region::find(2))->save();

        Ville::create([
            "libelle"=>"Kankan"
        ])->region()->associate(Region::find(3))->save();

        Ville::create([
            "libelle"=>"Kissidougou"
        ])->region()->associate(Region::find(4))->save();

    }
}
