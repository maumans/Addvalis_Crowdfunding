<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(RegionSeeder::class);
        $this->call(VilleSeeder::class);
        $this->call(AdresseSeeder::class);
        $this->call(SecteurSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(TypeCritereSeeder::class);
        $this->call(CritereSeeder::class);
    }
}
