<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Secteur extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function projets()
    {
        return $this->hasMany(Projet::class);
    }

    public function programmes()
    {
        return $this->belongsToMany(Programme::class,"programme_secteur");
    }
}
