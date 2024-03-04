<?php

use App\Http\Controllers\CakeController;
use App\Http\Controllers\CakeTypeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageController;
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
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::get('/cakes/{cake}', [CakeController::class, 'show'])
    ->name('cakes.show');

Route::get('/cakes', [CakeController::class, 'index'])
    ->name('cakes.index');
Route::get('/cakes/{cake}', [CakeController::class, 'show'])
    ->name('cakes.show');
Route::get('/cake-types', [CakeTypeController::class, 'index'])
    ->name('cakeType.index');
Route::get('cake-types/{cakeType}', [CakeTypeController::class, 'show'])
    ->name('cake-types.show');
require __DIR__ . '/auth.php';
