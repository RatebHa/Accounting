<?php

namespace App\Http\Controllers;

use App\Models\Expense;

use Illuminate\Http\Request;
use Inertia\Inertia;



class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::with('category')->where('user_id', auth()->id())->get();

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'amount' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:expense_categories,id',
        ]);

        $expense = new Expense($validatedData);
        $expense->user_id = auth()->id();
        $expense->save();

        return redirect()->route('expenses.index')->with('success', 'Expense has been created successfully.');
    }

    public function edit(Expense $expense)
    {
        $categories = ExpenseCategory::all(); // Fetch expense categories to populate dropdown

        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'amount' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:expense_categories,id',
        ]);

        $expense->update($validatedData);

        return redirect()->route('expenses.index')->with('success', 'Expense has been updated successfully.');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Expense has been deleted successfully.');
    }
}
