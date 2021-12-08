<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCriteresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteres', function (Blueprint $table) {
            $table->id();
            $table->string("description");
            $table->integer("notemax")->nullable();
            $table->boolean("choix")->nullable();
            $table->foreignId("type_critere_id")->nullable()->constrained("type_criteres")->cascadeOnDelete();
            $table->foreignId("genre_critere_id")->nullable()->constrained("genre_criteres")->cascadeOnDelete();
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
        Schema::dropIfExists('criteres');
    }
}
