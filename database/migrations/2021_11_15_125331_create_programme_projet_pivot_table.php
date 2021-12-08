<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgrammeProjetPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme_projet', function (Blueprint $table) {
            $table->id();
            $table->foreignId("programme_id")->nullable()->constrained("programmes")->cascadeOnDelete();
            $table->foreignId("projet_id")->nullable()->constrained("projets")->cascadeOnDelete();
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
        Schema::dropIfExists('programme_projet_pivot');
    }
}
