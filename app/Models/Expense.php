<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'amount', 'expense_type_id', 'user_id'];

    public function expenseType()
    {
        return $this->belongsTo(ExpenseType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applyExpense(User $user)
{
    switch ($this->frequency) {
        case 'daily':
            $user->balance -= $this->amount;
            break;
        case 'weekly':
            $user->balance -= $this->amount * 7;
            break;
        case 'monthly':
            $user->balance -= $this->amount * 30;
            break;
        case 'annually':
            $user->balance -= $this->amount * 365;
            break;
        default:
            $user->balance -= $this->amount;
            break;
    }

    $user->save();
}
}