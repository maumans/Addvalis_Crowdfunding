<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function projets()
    {
        return $this->belongsToMany(Projet::class,"programme_projet");
    }

    public function secteurs()
    {
        return $this->belongsToMany(Secteur::class,"programme_secteur");
    }

    public function criteres()
    {
        return $this->belongsToMany(Critere::class,"programme_critere");
    }
}
