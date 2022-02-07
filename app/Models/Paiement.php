<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function typePaiement()
    {
        return $this->belongsTo(TypePaiement::class);
    }
}
