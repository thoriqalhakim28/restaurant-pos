<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'order_id' => $this->order_id,
            'menu'     => new MenuResource($this->whenLoaded('menu')),
            'quantity' => $this->quantity,
            'price'    => $this->price,
            'subtotal' => $this->subtotal,
            'notes'    => $this->notes,
        ];
    }
}
