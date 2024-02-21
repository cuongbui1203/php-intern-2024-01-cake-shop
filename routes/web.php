<?php

use App\Http\Controllers\CakeController;
use App\Http\Controllers\CakeTypeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LandingPageController::class, 'landingPage']);

Route::get('/dashboard', [DashboardController::class, 'dashboard'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::group([
    'prefix' => 'users',
], function () {
    Route::get('/', [UserController::class, 'index'])->name('users.index');
    Route::get('/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/', [UserController::class, 'store'])->name('users.store');
    Route::get('/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/{user}/edit', [UserController::class, 'edit'])
        ->middleware('admin')
        ->name('users.edit');
    Route::put('/{user}', [UserController::class, 'update'])
        ->middleware('admin')
        ->name('users.update');
    Route::delete('/{user}', [UserController::class, 'destroy'])
        ->name('users.destroy')
        ->middleware('admin');
});

Route::resource('cakes', CakeController::class);
Route::resource('cake-types', CakeTypeController::class);
Route::resource('ingredients', IngredientController::class);
Route::resource('orders', OrderController::class);

require __DIR__ . '/auth.php';
