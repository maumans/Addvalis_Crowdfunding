<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgrammeRegionPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme_region', function (Blueprint $table) {
            $table->id();
            $table->foreignId("programme_id")->nullable()->constrained("programmes")->cascadeOnDelete();
            $table->foreignId("region_id")->nullable()->constrained("regions")->cascadeOnDelete();
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
        Schema::dropIfExists('programme_region');
    }
}
