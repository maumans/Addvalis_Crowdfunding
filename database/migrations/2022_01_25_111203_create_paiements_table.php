<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaiementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->string('pay_token');
            $table->bigInteger('amount');
            $table->enum('status', ['INITIATED', 'FAILED', 'CANCELED', 'SUCCESS'])->default('INITIATED');
            $table->foreignId("type_paiement_id")->nullable()->constrained("type_paiements")->cascadeOnDelete();
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
        Schema::dropIfExists('paiements');
    }
}
