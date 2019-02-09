<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIprangeAfrnicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('iprange_afrinic', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('ip_from')->nullable();
            $table->unsignedBigInteger('ip_to')->nullable();
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
        Schema::dropIfExists('iprange_afrinic');
    }
}