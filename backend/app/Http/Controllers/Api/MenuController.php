<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menus\StoreMenuRequest;
use App\Http\Requests\Menus\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Services\MenuService;
use App\Traits\ApiResponse;

class MenuController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected MenuService $menuService,
    ) {
    }

    public function index()
    {
        $data = $this->menuService->getAllMenus();

        $response = MenuResource::collection($data);

        return $this->successResponse($response);
    }

    public function store(StoreMenuRequest $request)
    {
        $data = $request->validated();

        $menu = $this->menuService->createMenu($data);

        $response = new MenuResource($menu);

        return $this->successResponse($response, 'Menu created successfully', 201);
    }

    public function show($id)
    {
        $menu = $this->menuService->getMenuById($id);

        if (! $menu) {
            return $this->errorResponse('Menu not found', 404);
        }

        $response = new MenuResource($menu);

        return $this->successResponse($response);
    }

    public function update(UpdateMenuRequest $request, int $id)
    {
        $data = $request->validated();

        $menu = $this->menuService->updateMenu($id, $data);

        if (! $menu) {
            return $this->errorResponse('Menu not found', 404);
        }

        $response = new MenuResource($menu);

        return $this->successResponse($response, 'Menu updated successfully');
    }

    public function destroy(int $id)
    {
        $menu = $this->menuService->deleteMenu($id);

        if (! $menu) {
            return $this->errorResponse('Menu not found', 404);
        }

        return $this->successResponse(null, 'Menu deleted successfully');
    }
}
