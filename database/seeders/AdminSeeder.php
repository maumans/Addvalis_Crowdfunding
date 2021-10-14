<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table("users")->delete();
        $user = User::create([
            'name' => "maurice mansaré",
            'email' => "mauricemansare@admin.com",
            'password' => Hash::make("Mm29101997"),
        ]);


        $user->roles()->attach(Role::where('libelle', "admin")->get());
    }
}
