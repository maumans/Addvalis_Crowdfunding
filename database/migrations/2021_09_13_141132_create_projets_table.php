<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string("titre")->nullable();
            $table->string("image")->nullable();
            $table->string("description")->nullable();
            $table->date("dateDebut")->nullable();
            $table->date("dateFin")->nullable();
            $table->integer("montantInitial")->nullable();
            $table->integer("montantRechercher")->nullable();
            $table->string("etat")->nullable();
            $table->longText("details")->nullable();
            $table->foreignId("secteur_id")->nullable()->constrained("secteurs")->cascadeOnDelete();
            $table->foreignId("user_id")->nullable()->constrained("users")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projets');
    }
}
