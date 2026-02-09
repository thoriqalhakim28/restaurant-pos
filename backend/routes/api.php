<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/table-list', [TableController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [UserController::class, 'index']);

    Route::middleware('role:waiter')->group(function () {
        Route::get('/tables', [TableController::class, 'index']);

        Route::prefix('categories')->group(function () {
            Route::get('/', [CategoryController::class, 'index']);
            Route::post('/', [CategoryController::class, 'store']);
            Route::get('/{id}', [CategoryController::class, 'show']);
            Route::put('/{id}', [CategoryController::class, 'update']);
            Route::delete('/{id}', [CategoryController::class, 'destroy']);
        });

        Route::prefix('menus')->group(function () {
            Route::get('/', [MenuController::class, 'index']);
            Route::post('/', [MenuController::class, 'store']);
            Route::get('/{id}', [MenuController::class, 'show']);
            Route::put('/{id}', [MenuController::class, 'update']);
            Route::delete('/{id}', [MenuController::class, 'destroy']);
        });

        Route::prefix('orders')->group(function () {
            Route::post('/', [OrderController::class, 'store']);
            Route::post('/{id}/items', [OrderController::class, 'addItem']);
            Route::put('/{id}/items/{itemId}', [OrderController::class, 'updateItem']);
            Route::delete('/{id}/items/{itemId}', [OrderController::class, 'removeItem']);
            Route::post('/{id}/cancel', [OrderController::class, 'cancel']);
        });
    });

    Route::middleware('role:cashier')->group(function () {
        Route::prefix('orders')->group(function () {
            Route::get('/', [OrderController::class, 'index']);
            Route::get('/{id}/receipt', [OrderController::class, 'receipt']);
        });
    });

    Route::middleware('role:waiter,cashier')->group(function () {
        Route::prefix('orders')->group(function () {
            Route::get('/{id}', [OrderController::class, 'show']);
            Route::post('/{id}/close', [OrderController::class, 'close']);
        });
    });
});
