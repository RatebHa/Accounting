<?php

namespace App\Models; 
use Illuminate\Database\Eloquent\Model;

class BalanceHistory extends Model
{
    protected $fillable = [
        'user_id',
        'expense_id',
        'amount_change',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }
}
