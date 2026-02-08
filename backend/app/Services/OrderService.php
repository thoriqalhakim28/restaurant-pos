<?php
namespace App\Services;

use App\Enum\OrderStatus;
use App\Enum\TableStatus;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    public function getAllOrders(?string $status = null)
    {
        $query = Order::with(['table', 'user', 'details.menu']);

        if ($status) {
            $query->where('status', $status);
        }

        return $query->orderBy('created_at', 'desc')->paginate();
    }

    public function getOrderById(int $id)
    {
        return Order::with(['table', 'user', 'details.menu'])->find($id);
    }

    public function openOrder(int $tableId): array
    {
        $table = Table::find($tableId);

        if (! $table) {
            return ['success' => false, 'message' => 'Table not found'];
        }

        if ($table->status !== TableStatus::AVAILABLE) {
            return ['success' => false, 'message' => 'Table is not available'];
        }

        $existingOrder = Order::where('table_id', $tableId)
            ->where('status', OrderStatus::OPEN)
            ->first();

        if ($existingOrder) {
            return ['success' => false, 'message' => 'Table already has an open order'];
        }

        return DB::transaction(function () use ($table) {
            $orderNumber = 'ORD-' . date('Ymd') . '-' . Str::upper(Str::random(6));

            $order = Order::create([
                'user_id'      => Auth::id(),
                'table_id'     => $table->id,
                'order_number' => $orderNumber,
                'total_amount' => 0,
                'status'       => OrderStatus::OPEN,
            ]);

            $table->update(['status' => TableStatus::OCCUPIED]);

            return [
                'success' => true,
                'order'   => $order->load(['table', 'user']),
            ];
        });
    }

    public function addItemToOrder(int $orderId, array $data): array
    {
        $order = Order::find($orderId);

        if (! $order) {
            return ['success' => false, 'message' => 'Order not found'];
        }

        if ($order->status !== OrderStatus::OPEN) {
            return ['success' => false, 'message' => 'Cannot add items to a closed order'];
        }

        $menu = Menu::find($data['menu_id']);

        if (! $menu) {
            return ['success' => false, 'message' => 'Menu item not found'];
        }

        return DB::transaction(function () use ($order, $menu, $data) {
            $quantity = $data['quantity'];
            $price    = $menu->price;
            $subtotal = $price * $quantity;

            $existingDetail = OrderDetail::where('order_id', $order->id)
                ->where('menu_id', $menu->id)
                ->first();

            if ($existingDetail) {
                $existingDetail->update([
                    'quantity' => $existingDetail->quantity + $quantity,
                    'subtotal' => $existingDetail->subtotal + $subtotal,
                    'notes'    => $data['notes'] ?? $existingDetail->notes,
                ]);
                $orderDetail = $existingDetail;
            } else {
                $orderDetail = OrderDetail::create([
                    'order_id' => $order->id,
                    'menu_id'  => $menu->id,
                    'quantity' => $quantity,
                    'price'    => $price,
                    'subtotal' => $subtotal,
                    'notes'    => $data['notes'] ?? null,
                ]);
            }

            $this->recalculateOrderTotal($order);

            return [
                'success'     => true,
                'orderDetail' => $orderDetail->load('menu'),
                'order'       => $order->fresh(['table', 'user', 'details.menu']),
            ];
        });
    }

    public function updateOrderItem(int $orderId, int $orderDetailId, array $data): array
    {
        $order = Order::find($orderId);

        if (! $order) {
            return ['success' => false, 'message' => 'Order not found'];
        }

        if ($order->status !== OrderStatus::OPEN) {
            return ['success' => false, 'message' => 'Cannot update items in a closed order'];
        }

        $orderDetail = OrderDetail::where('order_id', $orderId)
            ->where('id', $orderDetailId)
            ->first();

        if (! $orderDetail) {
            return ['success' => false, 'message' => 'Order item not found'];
        }

        return DB::transaction(function () use ($order, $orderDetail, $data) {
            $quantity = $data['quantity'];
            $orderDetail->update([
                'quantity' => $quantity,
                'subtotal' => $orderDetail->price * $quantity,
                'notes'    => $data['notes'] ?? $orderDetail->notes,
            ]);

            $this->recalculateOrderTotal($order);

            return [
                'success'     => true,
                'orderDetail' => $orderDetail->load('menu'),
                'order'       => $order->fresh(['table', 'user', 'details.menu']),
            ];
        });
    }

    public function removeItemFromOrder(int $orderId, int $orderDetailId): array
    {
        $order = Order::find($orderId);

        if (! $order) {
            return ['success' => false, 'message' => 'Order not found'];
        }

        if ($order->status !== OrderStatus::OPEN) {
            return ['success' => false, 'message' => 'Cannot remove items from a closed order'];
        }

        $orderDetail = OrderDetail::where('order_id', $orderId)
            ->where('id', $orderDetailId)
            ->first();

        if (! $orderDetail) {
            return ['success' => false, 'message' => 'Order item not found'];
        }

        return DB::transaction(function () use ($order, $orderDetail) {
            $orderDetail->delete();
            $this->recalculateOrderTotal($order);

            return [
                'success' => true,
                'order'   => $order->fresh(['table', 'user', 'details.menu']),
            ];
        });
    }

    public function closeOrder(int $orderId): array
    {
        $order = Order::find($orderId);

        if (! $order) {
            return ['success' => false, 'message' => 'Order not found'];
        }

        if ($order->status !== OrderStatus::OPEN) {
            return ['success' => false, 'message' => 'Order is already closed'];
        }

        return DB::transaction(function () use ($order) {
            $order->update(['status' => OrderStatus::CLOSED]);

            $order->table->update(['status' => TableStatus::AVAILABLE]);

            return [
                'success' => true,
                'order'   => $order->fresh(['table', 'user', 'details.menu']),
            ];
        });
    }

    public function cancelOrder(int $orderId): array
    {
        $order = Order::find($orderId);

        if (! $order) {
            return ['success' => false, 'message' => 'Order not found'];
        }

        if ($order->status !== OrderStatus::OPEN) {
            return ['success' => false, 'message' => 'Only open orders can be cancelled'];
        }

        return DB::transaction(function () use ($order) {
            $order->update(['status' => OrderStatus::CANCELLED]);

            $order->table->update(['status' => TableStatus::AVAILABLE]);

            return [
                'success' => true,
                'order'   => $order->fresh(['table', 'user', 'details.menu']),
            ];
        });
    }

    private function recalculateOrderTotal(Order $order): void
    {
        $total = OrderDetail::where('order_id', $order->id)->sum('subtotal');
        $order->update(['total_amount' => $total]);
    }
}
