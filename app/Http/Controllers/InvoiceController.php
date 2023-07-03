<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $userCurrency = Auth::user()->currency;
        $invoices = Invoice::with('customer')->get();
        $customers = Customer::all();

        return Inertia::render('Invoices', [
            'invoices' => $invoices,
            'customers' => $customers,
            'currency' => $userCurrency,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'invoice_number' => 'required',
            'description' => 'required',
            'amount_due' => 'required',
            'date' => 'required',
            'customer_id' => 'required|exists:customers,id',
        ]);

        // Fetch the authenticated user
        $user = Auth::user();
        
        // Use currency from the authenticated user's profile
        $currency = $user->currency;

        $invoice = Invoice::create([
            'invoice_number' => $validatedData['invoice_number'],
            'description' => $validatedData['description'],
            'amount_due' => $validatedData['amount_due'],
            'currency' => $currency,
            'date' => $validatedData['date'],
            'customer_id' => $validatedData['customer_id'],
        ]);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Invoice has been deleted successfully.');
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'invoice_number' => 'required',
            'description' => 'required',
            'amount_due' => 'required',
            'date' => 'required',
            'customer_id' => 'required|exists:customers,id',
        ]);

        // Fetch the authenticated user
        $user = Auth::user();
        
        // Use currency from the authenticated user's profile
        $currency = $user->currency;

        // Updating the invoice with the currency from the user's profile
        $invoice->update(array_merge($validatedData, ['currency' => $currency]));

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    public function edit(Invoice $invoice)
    {
        $invoice->load('customer');
        $customers = Customer::all();

        return Inertia::render('EditInvoicePage', [
            'invoice' => $invoice,
            'customers' => $customers,
        ]);
    }
}
