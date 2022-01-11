<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fichier extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function programme()
    {
        return $this->belongsTo(Programme::class);
    }
}
