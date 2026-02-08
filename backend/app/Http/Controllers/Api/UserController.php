<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Traits\ApiResponse;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected UserService $userService,
    ) {
    }

    public function index()
    {
        $data = $this->userService->getAllUsers();

        $response = UserResource::collection($data);

        return $this->successResponse($response);
    }
}
