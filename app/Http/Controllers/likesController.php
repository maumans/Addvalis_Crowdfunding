<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class likesController extends Controller
{
    public function liker(User $user,Projet $projet)
    {
        $projet->likeurs->contains(Auth::user())?$projet->likeurs()->detach(Auth::user()):
            $projet->likeurs()->syncWithoutDetaching(Auth::user());
        return redirect()->back();
    }
}
