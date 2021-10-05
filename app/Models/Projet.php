<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contributeurs()
    {
        return $this->belongsToMany(User::class,"contributions")->withPivot("montant");
    }

    public function secteur()
    {
        return $this->belongsTo(Secteur::class);
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }
}
