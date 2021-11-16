<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Critere extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function projets()
    {
        return $this->belongsToMany(Projet::class,"projet_critere");
    }

    public function typeCritere()
    {
        return $this->belongsTo(TypeCritere::class);
    }

    public function programmes()
    {
        return $this->belongsToMany(programmes::class);
    }
}
