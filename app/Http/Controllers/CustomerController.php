<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        // Retrieve customers from the database
        $customers = Customer::withCount('invoices')->get();

        // Get the user's preferred currency
        $userCurrency = Auth::user()->currency;

        $customers->each(function ($customer) use ($userCurrency) {
            // Summing the amounts in the user's preferred currency
            $amountOwned = 0;
            foreach ($customer->invoices as $invoice) {
                if ($invoice->currency === $userCurrency) {
                    $amountOwned += $invoice->amount_due;
                } else {
                    // Convert the amount to the user's preferred currency here if needed
                    // or handle different currency invoices differently.
                }
            }
            $customer->amount_owned = $amountOwned;
        });

        // Pass the customers data to the view
        return Inertia::render('Customers', [
            'customers' => $customers,
            'currency' => $userCurrency, // Passing the user's preferred currency to the view
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers',
            'phone' => 'required|string|max:20',
            'country' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        $customer = $user->customers()->create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'country' => $validatedData['country'],
        ]);

        return redirect()->back()->with('success', 'Customer created successfully.');
    }
}
