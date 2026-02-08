<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Orders\AddItemRequest;
use App\Http\Requests\Orders\OpenOrderRequest;
use App\Http\Requests\Orders\UpdateItemRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected OrderService $orderService,
    ) {}

    public function index(Request $request)
    {
        $status = $request->query('status');
        $data   = $this->orderService->getAllOrders($status);

        $response = OrderResource::collection($data);

        return $this->successResponse($response);
    }

    public function show(int $id)
    {
        $order = $this->orderService->getOrderById($id);

        if (! $order) {
            return $this->errorResponse('Order not found', 404);
        }

        $response = new OrderResource($order);

        return $this->successResponse($response);
    }

    public function store(OpenOrderRequest $request)
    {
        $data = $request->validated();


        $result = $this->orderService->openOrder($data['table_id']);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Order opened successfully', 201);
    }

    public function addItem(AddItemRequest $request, int $orderId)
    {
        $data = $request->validated();

        $result = $this->orderService->addItemToOrder($orderId, $data);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Item added successfully');
    }

    public function updateItem(UpdateItemRequest $request, int $orderId, int $itemId)
    {
        $data = $request->validated();

        $result = $this->orderService->updateOrderItem($orderId, $itemId, $data);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Item updated successfully');
    }

    public function removeItem(int $orderId, int $itemId)
    {
        $result = $this->orderService->removeItemFromOrder($orderId, $itemId);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Item removed successfully');
    }

    public function close(int $id)
    {
        $result = $this->orderService->closeOrder($id);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Order closed successfully');
    }

    public function cancel(int $id)
    {
        $result = $this->orderService->cancelOrder($id);

        if (! $result['success']) {
            return $this->errorResponse($result['message'], 400);
        }

        $response = new OrderResource($result['order']);

        return $this->successResponse($response, 'Order cancelled successfully');
    }
}
