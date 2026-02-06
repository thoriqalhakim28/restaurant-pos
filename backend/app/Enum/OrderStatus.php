<?php
namespace App\Enum;

enum OrderStatus: string {
    case OPEN      = 'open';
    case CLOSED    = 'closed';
    case CANCELLED = 'cancelled';
}
