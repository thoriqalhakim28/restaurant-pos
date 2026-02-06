<?php
namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAllCategories()
    {
        $data = Category::select('id', 'name', 'created_at', 'updated_at')->get();

        return $data;
    }

    public function createCategory(array $data)
    {
        return Category::create([
            'name' => $data['name'],
        ]);
    }

    public function getCategoryById(int $id)
    {
        return Category::find($id);
    }

    public function updateCategory(int $id, array $data)
    {
        $category = $this->getCategoryById($id);

        if (! $category) {
            return null;
        }

        $category->update([
            'name' => $data['name'],
        ]);

        return $category;
    }

    public function deleteCategory(int $id)
    {
        $category = $this->getCategoryById($id);

        if (! $category) {
            return false;
        }

        return $category->delete();
    }
}
