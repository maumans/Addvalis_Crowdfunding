<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypePaiement extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}
