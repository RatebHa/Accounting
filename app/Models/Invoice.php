<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'description',
        'amount_due',
        'currency',
        'date',
        'customer_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getAmountPaidAttribute()
    {
        return $this->payments->sum('amount');
    }

    public function getAmountRemainingAttribute()
    {
        return $this->amount_due - $this->amount_paid;
    }
}