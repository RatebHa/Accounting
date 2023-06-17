<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use GuzzleHttp\Client;
use App\Models\Payment;

class CustomerController extends Controller
{
    public function index()
    {
        // Retrieve customers from the database
        $customers = Customer::withCount('invoices')->get();

        $client = new Client();

        $customers->each(function ($customer) use ($client) {
            $customer->amount_owned = $customer->invoices->sum('amount_due');

            // Convert the amount owned to USD using the currency converter API
            $customer->amount_owned_usd = $this->convertToUSD($customer->amount_owned, $customer->invoices->pluck('currency')->unique(), $client);
        });

        // Pass the customers data to the view
        return Inertia::render('Customers', [
            'customers' => $customers,
        ]);
    }

    private function convertToUSD($amount, $currencies, $client)
{
    $conversionRates = $this->getConversionRates($client);
    $usdConversionRate = $conversionRates['rates']['USD'];

    $totalUSD = $currencies->reduce(function ($total, $currency) use ($amount, $conversionRates, $usdConversionRate) {
        if ($currency === 'USD') {
            return $total + $amount;
        }

        if (isset($conversionRates['rates'][$currency])) {
            $conversionRate = $conversionRates['rates'][$currency];
            return $total + ($amount / $conversionRate) * $usdConversionRate;
        }

        return $total;
    }, 0);

    return $totalUSD;
}

private function getConversionRates($client)
{
    return Cache::remember('conversion_rates', now()->addHours(24), function () use ($client) {
        $response = $client->request('GET', 'https://api.exchangerate-api.com/v4/latest/USD');
        return json_decode($response->getBody(), true);
    });
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