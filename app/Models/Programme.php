<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $guarded=[];

    protected $joursRestant;

    protected $nombreProjets;


    public function getJoursRestantAttribute(){
        return $this->joursRestant;
    }
    public function setJoursRestantAttribute($joursRestant){
        $this->joursRestant = $joursRestant;
    }

    public function getNombreProjetsAttribute(){
        return $this->nombreProjets;
    }
    public function setNombreProjetsAttribute($nombreProjets){
        $this->nombreProjets = $nombreProjets;
    }

    protected $appends = ["joursRestant","nombreProjets"];


    public function projets()
    {
        return $this->belongsToMany(Projet::class,"programme_projet");
    }

    public function secteurs()
    {
        return $this->belongsToMany(Secteur::class,"programme_secteur");
    }

    public function regions()
    {
        return $this->belongsToMany(Region::class,"programme_region");
    }

    public function criteres()
    {
        return $this->belongsToMany(Critere::class,"programme_critere");
    }

    public function fichiers()
    {
        return $this->hasMany(Fichier::class);
    }
}
