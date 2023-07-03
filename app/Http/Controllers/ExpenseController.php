<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\BalanceHistory;
use App\Models\Expense;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::all();
        $userCurrency = Auth::user()->currency;

        return Inertia::render('Expenses', [
            'expenses' => $expenses,
            'currency' => $userCurrency,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:daily,weekly,monthly,annually,one_time',
            'category' => 'required|in:in,out',
            'description' => 'required|string',
            'amount' => 'required|numeric|min:0'
        ]);

        $expense = new Expense;

        $expense->user_id = auth()->id();
        $expense->type = $request->type;
        $expense->category = $request->category;
        $expense->description = $request->description;
        $expense->amount = $request->amount;

        $expense->save();

        $balance = Balance::where('user_id', auth()->id())->first();
        $balance->balance += ($expense->category == 'in') ? $expense->amount : -$expense->amount;
        $balance->save();

        BalanceHistory::create([
            'user_id' => auth()->id(),
            'expense_id' => $expense->id,
            'amount_change' => ($expense->category == 'in') ? $expense->amount : -$expense->amount,
        ]);

        // return response()->json(['message' => 'Expense created successfully'], 201);
    }
}