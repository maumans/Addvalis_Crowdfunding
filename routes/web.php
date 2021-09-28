<?php

use App\Models\Projet;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Secteur;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $secteurs=Secteur::all();
    $projets=Projet::orderBy('created_at',"desc")->with("user")->get();
    return Inertia::render('Accueil', [
        "secteurs"=>$secteurs,
        "projets"=>$projets,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("home");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get("/accueil",function () {

    $secteurs=Secteur::all();
    $projets=Projet::orderBy('created_at',"desc")->with("user")->get();
    return Inertia::render("Accueil",["secteurs"=>$secteurs, "projets"=>$projets,]);
})->name("accueil");


Route::resource("user.projet",\App\Http\Controllers\User\ProjetController::class)->middleware(['auth', 'verified']);
Route::resource("secteur",\App\Http\Controllers\SecteurController::class)->middleware(['auth', 'verified']);
Route::resource("contribution",\App\Http\Controllers\ContributionController::class)->middleware(['auth', 'verified']);


require __DIR__.'/auth.php';
