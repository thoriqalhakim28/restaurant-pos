<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use App\Traits\ApiResponse;

class CategoryController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected CategoryService $categoryService,
    ) {
    }

    public function index()
    {
        $data = $this->categoryService->getAllCategories();

        $response = CategoryResource::collection($data);

        return $this->successResponse($response);
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        $category = $this->categoryService->createCategory($data);

        $response = new CategoryResource($category);

        return $this->successResponse($response, 'Category created successfully', 201);
    }

    public function show(int $id)
    {
        $category = $this->categoryService->getCategoryById($id);

        if (! $category) {
            return $this->errorResponse('Category not found', 404);
        }

        $response = new CategoryResource($category);

        return $this->successResponse($response);
    }

    public function update(UpdateCategoryRequest $request, int $id)
    {
        $data = $request->validated();

        $category = $this->categoryService->updateCategory($id, $data);

        if (! $category) {
            return $this->errorResponse('Category not found', 404);
        }

        $response = new CategoryResource($category);

        return $this->successResponse($response, 'Category updated successfully');
    }

    public function destroy(int $id)
    {
        $category = $this->categoryService->deleteCategory($id);

        if (! $category) {
            return $this->errorResponse('Category not found', 404);
        }

        return $this->successResponse(null, 'Category deleted successfully');
    }
}
