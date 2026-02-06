<?php
namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;

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
            'slug' => Str::slug($data['name']),
        ]);
    }

    public function getCategoryById(int $id)
    {
        $category = Category::find($id);

        if (! $category) {
            return null;
        }

        return $category;
    }

    public function updateCategory(int $id, array $data)
    {
        $category = $this->getCategoryById($id);

        if (! $category) {
            return null;
        }

        $category->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
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
