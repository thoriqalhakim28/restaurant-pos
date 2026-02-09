<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'order_number' => $this->order_number,
            'table'        => new TableResource($this->whenLoaded('table')),
            'user'         => $this->when($this->relationLoaded('user'), function () {
                return [
                    'id'   => $this->user->id,
                    'name' => $this->user->name,
                ];
            }),
            'total_amount' => $this->total_amount,
            'status'       => $this->status,
            'order_date'   => $this->order_date,
            'details'      => OrderDetailResource::collection($this->whenLoaded('details')),
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
