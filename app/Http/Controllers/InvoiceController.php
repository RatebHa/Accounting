<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('customer')->get();
        $customers = Customer::all();

        return Inertia::render('Invoices', [
            'invoices' => $invoices,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'invoice_number' => 'required',
            'description' => 'required',
            'amount_due' => 'required',
            'currency' => 'required',
            'date' => 'required',
            'customer_id' => 'required|exists:customers,id',
        ]);

        $invoice = Invoice::create([
            'invoice_number' => $validatedData['invoice_number'],
            'description' => $validatedData['description'],
            'amount_due' => $validatedData['amount_due'],
            'currency' => $validatedData['currency'],
            'date' => $validatedData['date'],
            'customer_id' => $validatedData['customer_id'],
        ]);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'invoice_number' => 'required',
            'description' => 'required',
            'amount_due' => 'required',
            'currency' => 'required',
            'date' => 'required',
            'customer_id' => 'required|exists:customers,id',
        ]);

        $invoice->update($validatedData);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    public function edit(Invoice $invoice)
    {
        $customers = Customer::all();

        return Inertia::render('EditInvoicePage', [
            'invoice' => $invoice,
            'customers' => $customers,
        ]);
    }
}