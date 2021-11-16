<?php

namespace Database\Seeders;

use App\Models\Adresse;
use App\Models\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdresseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("adresses")->delete();

        Adresse::create()->ville()->associate(Ville::find(1))->save();
        Adresse::create()->ville()->associate(Ville::find(2))->save();
        Adresse::create()->ville()->associate(Ville::find(3))->save();
        Adresse::create()->ville()->associate(Ville::find(4))->save();
    }
}
