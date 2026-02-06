<?php
namespace App\Services;

use App\Models\Table;

class TableService
{
    public function getAllTables()
    {
        $data = Table::all();

        return $data;
    }
}
