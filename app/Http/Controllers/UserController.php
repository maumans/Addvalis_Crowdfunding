<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Boolean;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show(User $user)
    {
        $projetsSoutenus=$user->projetFinances()->with("user")->get();
        $factoryDate = new Factory([
            'locale' => 'fr_FR',
            'timezone' => 'Europe/Paris',
        ]);
        $dateInscription=$factoryDate->make($user->created_at)->isoFormat('ll');

        return Inertia::render('User/Show',["user"=>$user,"projetsSoutenus"=>$projetsSoutenus,"dateInscription"=>$dateInscription]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @param $biographie
     * @return \Inertia\Response
     */
    public function edit(User $user,$biographie="")
    {
        return Inertia::render('User/Edit',["biographie"=>$biographie&&true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, User $user)
    {

        $request->validate([
            "user.name"=>"required",
            "user.email"=>"required",
            "user.biographie"=>"max:300"
        ],
        [
            "user.name.required" =>"Le nom est requis",
            "user.email.required" =>"L'email est requis",
            "user.biographie.max" =>"La biographie ne doit pas depasser 300 caractères"
        ]);

        $url=null;

        if($request->user["photoProfil"] !== null)
        {
            $nom=$request->file("user.photoProfil")->store("/usersImages","public");
            $url=Storage::url($nom);
        }


        $user->name=$request->user["name"];
        $user->email=$request->user["email"];
        $user->biographie=$request->user["biographie"];
        $url && $user->photoProfil=$url;

        $user->save();

        return  redirect()->back()->with("success","Utilisateur modifié avec succès");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back();
    }
}
