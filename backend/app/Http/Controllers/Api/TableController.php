<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TableResource;
use App\Services\TableService;
use App\Traits\ApiResponse;

class TableController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected TableService $tableService,
    ) {
    }

    public function index()
    {
        $data = $this->tableService->getAllTables();

        $response = TableResource::collection($data);

        return $this->successResponse($response);
    }
}
