<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function projets()
    {
        return $this->hasMany(Projet::class);
    }
}
