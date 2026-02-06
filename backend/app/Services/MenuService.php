<?php
namespace App\Services;

use App\Models\Menu;

class MenuService
{
    public function getAllMenus()
    {
        $data = Menu::select('id', 'name', 'description', 'price', 'created_at', 'updated_at')->paginate();

        return $data;
    }

    public function createMenu(array $data)
    {
        return Menu::create([
            'category_id' => $data['category_id'],
            'name'        => $data['name'],
            'description' => $data['description'],
            'price'       => $data['price'],
        ]);
    }

    public function getMenuById(int $id)
    {
        return Menu::find($id);
    }

    public function updateMenu(int $id, array $data)
    {
        $menu = $this->getMenuById($id);

        if (! $menu) {
            return null;
        }

        $menu->update([
            'category_id' => $data['category_id'],
            'name'        => $data['name'],
            'description' => $data['description'],
            'price'       => $data['price'],
        ]);

        return $menu;
    }

    public function deleteMenu(int $id)
    {
        $menu = $this->getMenuById($id);

        if (! $menu) {
            return false;
        }

        return $menu->delete();
    }
}
