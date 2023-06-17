<?php

namespace App\Console\Commands;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Console\Command;

class ProcessExpenses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-expenses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expenses = Expense::whereIn('frequency', ['daily', 'weekly', 'monthly', 'annually'])->get();

        $users = User::all();

        foreach ($users as $user) {
            foreach ($expenses as $expense) {
                $expense->applyExpense($user);
            }
        }
    }
}