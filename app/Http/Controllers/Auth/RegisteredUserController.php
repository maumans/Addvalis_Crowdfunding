<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],
        [
            "name.required" =>"le nom est requis",
            "name.string" =>"le nom doit etre un chaine de caractères",
            "name.string" =>"le nombre de caractères maximal est 255",
            "email.required" =>"l'email est requis",

            "email.string" =>"l'email doit etre un chaine de caractères",
            "email.max" =>"le nombre de caractères maximal est 255",
            "email.unique" =>"l'email est unique",
            "email.email" =>"ce champs doit contenir un email",
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "status"=>"actif"
        ]);


        $user->roles()->attach(Role::where('libelle', "user")->get());

        event(new Registered($user));

        Auth::login($user);




        return redirect(RouteServiceProvider::HOME);
    }
}
