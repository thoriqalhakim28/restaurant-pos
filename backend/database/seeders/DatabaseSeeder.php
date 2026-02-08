<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name'      => 'Admin',
            'email'     => 'admin@example.com',
            'password'  => bcrypt('password'),
            'role'      => 'admin',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name'      => 'Pelayan',
            'email'     => 'waiter@example.com',
            'password'  => bcrypt('password'),
            'role'      => 'waiter',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name'      => 'Kasir',
            'email'     => 'cashier@example.com',
            'password'  => bcrypt('password'),
            'role'      => 'cashier',
            'is_active' => true,
        ]);

        $this->call([
            TableSeeder::class,
            CategorySeeder::class,
            MenuSeeder::class,
        ]);
    }
}
