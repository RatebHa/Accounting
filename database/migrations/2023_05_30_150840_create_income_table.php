<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncomeTable extends Migration
{
    public function up()
    {
        Schema::create('income', function (Blueprint $table) {
            $table->id();
            $table->string('source');
            $table->decimal('amount', 8, 2);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();

            
        });
    }

    public function down()
    {
        Schema::dropIfExists('income');
    }
};

