<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeProjet extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function projets()
    {
        $this->hasMany(Projet::class);
    }
}
