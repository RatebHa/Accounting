<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->text('description');
            $table->date('date')->default(DB::raw('CURRENT_DATE'));
            $table->unsignedBigInteger('customer_id')->nullable()->default(null);
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->decimal('amount_due', 10, 2);
            $table->string('currency');
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
