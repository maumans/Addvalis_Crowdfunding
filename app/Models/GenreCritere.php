<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenreCritere extends Model
{
    use HasFactory;

    public function criteres()
    {
        return $this->hasMany(Critere::class);
    }
}
