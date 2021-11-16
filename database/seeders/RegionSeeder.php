<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("regions")->delete();
        Region::create([
            "libelle"=>"Basse Guinée"
        ]);
        Region::create([
            "libelle"=>"Moyenne Guinée"
        ]);

        Region::create([
            "libelle"=>"Haute Guinée"
        ]);

        Region::create([
            "libelle"=>"Guinée Forestière"
        ]);
    }
}
