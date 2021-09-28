<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Secteur extends Model
{
    use HasFactory;

    protected $guards = [];

    public function projets()
    {
        return $this->hasMany(Projet::class);
    }
}
