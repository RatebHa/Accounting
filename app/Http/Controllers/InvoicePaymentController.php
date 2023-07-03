<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InvoicePaymentController extends Controller
{
    public function index(Invoice $invoice)
    {
        $payments = $invoice->payments;

        return Inertia::render('Payments', [
            'invoice' => $invoice,
            'payments' => $payments,
        ]);
    }

    public function store(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'amount' => 'required',
            'payment_date' => 'required',
        ]);

        // Calculate the remaining amount due
        $remainingAmountDue = $invoice->amount_due - $invoice->payments->sum('amount');

        // Ensure the payment amount does not exceed the remaining amount due
        if ($validatedData['amount'] > $remainingAmountDue) {
            return redirect()->back()->withErrors(['amount' => 'The payment amount exceeds the remaining amount due.']);
        }

        $payment = new Payment($validatedData);
        $payment->invoice_id = $invoice->id;
        $payment->save();

        // Deduct the payment amount from the amount due of the invoice
        $invoice->amount_due -= $validatedData['amount'];
        $invoice->save();

        return redirect()->route('payments.index', $invoice)->with('success', 'Payment has been created successfully.');
    }

    

    public function destroy(Payment $payment)
    {
        $invoice = $payment->invoice;
        $payment->delete();

        // Update the amount due of the invoice
        $invoice->amount_due += $payment->amount;
        $invoice->save();

        return redirect()->route('payments.index', $invoice)->with('success', 'Payment has been deleted successfully.');
    }
    public function edit(Payment $payment)
    {
        return Inertia::render('EditPaymentPage', [
            'payment' => $payment,
        ]);
    }

    public function update(Request $request, Payment $payment)
{
    $validatedData = $request->validate([
        'amount' => 'required',
        'payment_date' => 'required',
        'invoice_id' => 'required|exists:invoices,id',
    ]);

    $payment->update($validatedData);

    // Recalculate the amount due for the invoice
    $invoice = $payment->invoice;
    $invoice->amount_due = $invoice->amount - $invoice->payments->sum('amount');
    $invoice->save();

    return redirect()->route('payments.index', $invoice)->with('success', 'Payment has been updated successfully.');
}
}