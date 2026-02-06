<?php
namespace App\Models;

use App\Enum\TableStatus;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $fillable = ['table_number', 'status'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    protected function casts(): array
    {
        return [
            'status' => TableStatus::class,
        ];
    }
}
