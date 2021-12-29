<?php

use App\Http\Controllers\ProgrammeController;
use App\Models\Programme;
use App\Models\Projet;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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
    $programmes=Programme::all();

    foreach($projets as $p)
    {
        $p->like=$p->likeurs->contains(Auth::user());
        $p->enregistre=$p->enregistreurs->contains(Auth::user());
    }


    return Inertia::render('Accueil', [
        "secteurs"=>$secteurs,
        "projets"=>$projets,
        "programmes"=>$programmes,
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
    $programmes=Programme::all();

    foreach($projets as $p)
    {
        $p->like=$p->likeurs->contains(Auth::user());
        $p->enregistre=$p->enregistreurs->contains(Auth::user());
    }

    return Inertia::render("Accueil",["secteurs"=>$secteurs, "projets"=>$projets,"programmes"=>$programmes]);
})->name("accueil");

//Projet route
Route::resource("projet",\App\Http\Controllers\ProjetController::class)->except("show","index")->middleware(['auth', 'verified']);
Route::resource("projet",\App\Http\Controllers\ProjetController::class)->only("show")->middleware(["projectIsValidated"]);
Route::resource("projet",\App\Http\Controllers\ProjetController::class)->only("index");
Route::post("/projet/contribuer",[\App\Http\Controllers\ProjetController::class,"contribuer"])->middleware(['auth', 'verified']);
Route::get("/projet/search/{search}",[\App\Http\Controllers\ProjetController::class,"searchProject"])->name("projet.search");

//User route
Route::resource("user",\App\Http\Controllers\UserController::class)->middleware(['auth', 'verified'])->except("edit");
Route::get("user/{user}/edit/{biographie?}",[\App\Http\Controllers\UserController::class,"edit"])->name("user.edit")->middleware(['auth', 'verified']);
Route::resource("user.projet",\App\Http\Controllers\User\ProjetController::class)->middleware(['auth', 'verified']);
Route::get("user/{user}/save",[\App\Http\Controllers\SaveController::class,"index"])->name("user.projet.save")->middleware(['auth', 'verified']);




Route::inertia("user/projet/attente","User/Projet/Attente",["success"=>"projet crée"])->name("attente")->middleware(['auth', 'verified']);
Route::post("/uploadImage",[\App\Http\Controllers\User\ProjetController::class,"uploadImage"])->name("uploadImage")->middleware(['auth', 'verified']);;


Route::resource("secteur",\App\Http\Controllers\SecteurController::class);
Route::resource("user.contribution",\App\Http\Controllers\User\ContributionController::class)->middleware(['auth', 'verified']);


//Admin route
Route::resource("admin.projet",\App\Http\Controllers\Admin\ProjetController::class)->middleware(['auth', 'verified',"userIsAdmin"]);
Route::resource("admin.programme",\App\Http\Controllers\Admin\ProgrammeController::class)->except("edit")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::resource("admin.programme",\App\Http\Controllers\Admin\ProgrammeController::class)->only("edit")->middleware(['auth', 'verified',"userIsAdmin","programmeIsEditable"]);
Route::resource("admin.secteur",\App\Http\Controllers\Admin\SecteurController::class)->middleware(['auth', 'verified',"userIsAdmin"]);
Route::resource("admin.utilisateur",\App\Http\Controllers\Admin\UtilisateurController::class)->middleware(['auth', 'verified',"userIsAdmin"]);
Route::resource("admin.critere",\App\Http\Controllers\Admin\CritereController::class)->middleware(['auth', 'verified',"userIsAdmin"]);
Route::get("/admin/{userId}/projet/validation/index",[\App\Http\Controllers\Admin\ProjetController::class,"validationIndex"])->name("admin.projet.validation.index")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::get("/admin/{userId}/projet/validation/{projetId}/show",[\App\Http\Controllers\Admin\ProjetController::class,"validationShow"])->name("admin.projet.validation.show")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::post("/admin/{userId}/projet/{projetId}/validation",[\App\Http\Controllers\Admin\ProjetController::class,"valider"])->name("admin.projet.validation")->middleware(['auth', 'verified',"userIsAdmin"]);
Route::delete("/admin/{user}/projet/{projet}/validation",[\App\Http\Controllers\Admin\ProjetController::class,"validationDestroy"])->name("admin.projet.validation.destroy")->middleware(['auth', 'verified',"userIsAdmin"]);

//Admin Programme Projet route
Route::resource("admin.programme.projet",\App\Http\Controllers\Admin\Programme\ProjetController::class)->middleware(['auth', 'verified',"userIsAdmin"]);




////Programme route
Route::resource("programme",ProgrammeController::class)->middleware(['auth', 'verified'])->except("index","show");
Route::resource("programme",ProgrammeController::class)->only("index","show");
Route::get("programme/{programme}/projet",[ProgrammeController::class,"createProject"])->middleware(['auth', 'verified'])->name("programme.projet");


//Likes route
Route::name("likes.")->group(function(){
    Route::get("Likes/{user}/liker/{projet}",[\App\Http\Controllers\likesController::class,"liker"])->middleware(['auth', 'verified'])->name("liker");
});

//Likes route
Route::name("save.")->group(function(){
    Route::get("save/{user}/enregistrer/{projet}",[\App\Http\Controllers\saveController::class,"enregistrer"])->middleware(['auth', 'verified'])->name("enregistrer");
});

require __DIR__.'/auth.php';
