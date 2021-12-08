<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgrammeCriterePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme_critere', function (Blueprint $table) {
            $table->id();
            $table->foreignId("programme_id")->nullable()->constrained("programmes")->cascadeOnDelete();
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
        Schema::dropIfExists('programme_critere');
    }
}
