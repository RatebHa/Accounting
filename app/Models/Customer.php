<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public static $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:customers',
        'phone' => 'nullable|string|max:20',
        'country' => 'nullable|string|max:255',
    ];

    protected $fillable = ['name', 'email', 'phone', 'country'];

}