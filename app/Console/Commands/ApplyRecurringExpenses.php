<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Expense;
use App\Models\Balance;
use App\Models\BalanceHistory;
use DateTime;
use DateInterval;

class ApplyRecurringExpenses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expenses:apply';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Apply recurring expenses to users balances';

    /**
     * Execute the console command.
     */
    public function handle()
{
    $expenses = Expense::where('type', '!=', 'one_time')->get();

    foreach ($expenses as $expense) {
        $lastAppliedDate = new DateTime($expense->updated_at);
        $nextApplyDate = clone $lastAppliedDate;

        switch ($expense->type) {
            case 'daily':
                $nextApplyDate->add(new DateInterval('P1D'));
                break;
            case 'weekly':
                $nextApplyDate->add(new DateInterval('P1W'));
                break;
            case 'monthly':
                $nextApplyDate->add(new DateInterval('P1M'));
                break;
            case 'annually':
                $nextApplyDate->add(new DateInterval('P1Y'));
                break;
        }

        if ($nextApplyDate <= new DateTime()) {
            $balance = Balance::where('user_id', $expense->user_id)->first();
            $amountChange = ($expense->category == 'in') ? $expense->amount : -$expense->amount;
            $balance->balance += $amountChange;
            $balance->save();

            BalanceHistory::create([
                'user_id' => $expense->user_id,
                'expense_id' => $expense->id,
                'amount_change' => $amountChange,
            ]);

            $expense->touch();
        }
    }
}

}
