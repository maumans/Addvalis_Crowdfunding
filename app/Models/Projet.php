<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $guarded=[];

    protected $like;
    protected $enregistre;
    protected $pourcentage;
    protected $joursRestant;
    protected $montantFinance;


    public function getLikeAttribute(){
        return $this->like;
    }
    public function setLikeAttribute($like){
        $this->like = $like;
    }

    public function getEnregistreAttribute(){
        return $this->enregistre;
    }
    public function setEnregistreAttribute($enregistre){
        $this->enregistre = $enregistre;
    }

    public function getPourcentageAttribute(){
        return $this->pourcentage;
    }
    public function setPourcentageAttribute($pourcentage){
        $this->pourcentage = $pourcentage;
    }

    public function getJoursRestantAttribute(){
        return $this->joursRestant;
    }
    public function setJoursRestantAttribute($joursRestant){
        $this->joursRestant = $joursRestant;
    }

    public function getMontantFinanceAttribute(){
        return $this->montantFinance;
    }
    public function setMontantFinanceAttribute($montantFinance){
        $this->montantFinance = $montantFinance;
    }

    protected $appends = ['like','enregistre','pourcentage',"joursRestant","montantFinance"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contributeurs()
    {
        return $this->belongsToMany(User::class,"contributions")->withPivot("montant");
    }

    public function secteur()
    {
        return $this->belongsTo(Secteur::class);
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }

    public function likeurs()
    {
        return $this->belongsToMany(User::class,"likes");
    }

    public function enregistreurs()
    {
        return $this->belongsToMany(User::class,"save");
    }

    public function criteres()
    {
        return $this->belongsToMany(Critere::class,"projet_critere")->with(["typeCritere","genreCritere"])->withPivot("note","choix");
    }

    public function programmes()
    {
        return $this->belongsToMany(Programme::class,"programme_projet");
    }

    public function adresse()
    {
        return $this->belongsTo(Adresse::class);
    }

    public function typeProjet()
    {
        return $this->belongsTo(TypeProjet::class);
    }


}
