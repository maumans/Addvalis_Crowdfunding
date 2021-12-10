<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetCriterePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projet_critere', function (Blueprint $table) {
            $table->id();
            $table->string("note")->nullable();
            $table->boolean("choix")->nullable();
            $table->foreignId("projet_id")->nullable()->constrained("projets")->cascadeOnDelete();
            $table->foreignId("critere_id")->nullable()->constrained("criteres")->cascadeOnDelete();
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
        Schema::dropIfExists('projet_critere');
    }
}
