<?php
namespace Database\Seeders;

use App\Models\Category;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menus = [
            'Appetizers'  => [
                ['name' => 'Spring Rolls', 'description' => 'Crispy vegetable spring rolls with sweet chili sauce', 'price' => 25000],
                ['name' => 'Chicken Wings', 'description' => 'Spicy buffalo chicken wings with ranch dip', 'price' => 35000],
                ['name' => 'Garlic Bread', 'description' => 'Toasted bread with garlic butter and herbs', 'price' => 18000],
            ],
            'Main Course' => [
                ['name' => 'Grilled Salmon', 'description' => 'Fresh salmon fillet with lemon butter sauce', 'price' => 95000],
                ['name' => 'Beef Steak', 'description' => 'Premium beef tenderloin with mushroom sauce', 'price' => 120000],
                ['name' => 'Chicken Parmesan', 'description' => 'Breaded chicken breast with tomato sauce and cheese', 'price' => 75000],
            ],
            'Desserts'    => [
                ['name' => 'Chocolate Lava Cake', 'description' => 'Warm chocolate cake with molten center', 'price' => 35000],
                ['name' => 'Tiramisu', 'description' => 'Classic Italian coffee-flavored dessert', 'price' => 40000],
                ['name' => 'Ice Cream Sundae', 'description' => 'Vanilla ice cream with chocolate sauce and nuts', 'price' => 28000],
            ],
            'Beverages'   => [
                ['name' => 'Fresh Orange Juice', 'description' => 'Freshly squeezed orange juice', 'price' => 20000],
                ['name' => 'Iced Coffee', 'description' => 'Cold brew coffee with milk', 'price' => 25000],
                ['name' => 'Mineral Water', 'description' => 'Bottled mineral water 500ml', 'price' => 10000],
            ],
        ];

        foreach ($menus as $categoryName => $items) {
            $category = Category::where('name', $categoryName)->first();

            if ($category) {
                foreach ($items as $item) {
                    Menu::create([
                        'category_id' => $category->id,
                        'name'        => $item['name'],
                        'description' => $item['description'],
                        'price'       => $item['price'],
                    ]);
                }
            }
        }
    }
}
