<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            ['code' => '101', 'name' => 'Cash', 'type' => 'asset'],
            ['code' => '201', 'name' => 'Accounts Payable', 'type' => 'liability'],
            // Add more account entries as needed
        ];
        
        foreach ($accounts as $account) {
            Account::create($account);
        }
    }
}