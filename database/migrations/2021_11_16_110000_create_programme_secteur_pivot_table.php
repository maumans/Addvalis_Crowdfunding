<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgrammeSecteurPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme_secteur', function (Blueprint $table) {
            $table->id();
            $table->foreignId("programme_id")->nullable()->constrained("programmes");
            $table->foreignId("secteur_id")->nullable()->constrained("secteurs");
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
        Schema::dropIfExists('programme_secteur_pivot');
    }
}
