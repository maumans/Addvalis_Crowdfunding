<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCritere extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function criteres()
    {
        return $this->hasMany(TypeCritere::class);
    }
}
