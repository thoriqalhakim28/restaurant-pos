<?php
namespace Database\Seeders;

use App\Enum\TableStatus;
use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfTables = 25;

        for ($i = 1; $i <= $numberOfTables; $i++) {
            Table::create([
                'table_number' => $i,
                'status'       => TableStatus::AVAILABLE,
            ]);
        }
    }
}
