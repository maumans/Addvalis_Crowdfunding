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
    $projets=Projet::where("etat","valide")->orderBy('created_at',"desc")->with("user")->get();
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
    $projets=Projet::where("etat","valide")->orderBy('created_at',"desc")->with("user")->get();
    return Inertia::render("Accueil",["secteurs"=>$secteurs, "projets"=>$projets,]);
})->name("accueil");


Route::resource("projet",\App\Http\Controllers\ProjetController::class)->middleware(['auth', 'verified']);
Route::post("/projet/contribuer",[\App\Http\Controllers\ProjetController::class,"contribuer"])->middleware(['auth', 'verified']);

//User route
Route::resource("user.projet",\App\Http\Controllers\User\ProjetController::class)->middleware(['auth', 'verified']);
Route::inertia("user/projet/attente","User/Projet/Attente",["success"=>"projet crée"])->name("attente")->middleware(['auth', 'verified']);

Route::resource("secteur",\App\Http\Controllers\SecteurController::class)->middleware(['auth', 'verified']);
Route::resource("user.contribution",\App\Http\Controllers\User\ContributionController::class)->middleware(['auth', 'verified']);


//Admin route
Route::resource("admin.projet",\App\Http\Controllers\Admin\ProjetController::class)->middleware(['auth', 'verified',"userIsAdmin"]);
Route::get("/admin/{userId}/projet/validation/index",[\App\Http\Controllers\Admin\ProjetController::class,"validationIndex"])->name("admin.projet.validation.index")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::get("/admin/{userId}/projet/validation/{projetId}/show",[\App\Http\Controllers\Admin\ProjetController::class,"validationShow"])->name("admin.projet.validation.show")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::get("/admin/{userId}/projet/{projetId}/validation",[\App\Http\Controllers\Admin\ProjetController::class,"valider"])->name("admin.projet.validation")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::delete("/admin/{user}/projet/{projet}/validation",[\App\Http\Controllers\Admin\ProjetController::class,"validationDestroy"])->name("admin.projet.validation.destroy")->middleware(['auth', 'verified',"userIsAdmin"]);

require __DIR__.'/auth.php';
