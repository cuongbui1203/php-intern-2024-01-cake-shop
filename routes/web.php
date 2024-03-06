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

require __DIR__ . '/auth.php';

Route::get('/', [LandingPageController::class, 'landingPage'])
    ->name('landing');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::name('cakes.')
    ->prefix('cakes')
    ->group(function () {
        Route::get('/', [CakeController::class, 'index'])
            ->name('index');
        Route::get('/{cake}', [CakeController::class, 'show'])
            ->name('show');
    });

Route::name('cake-types.')
    ->prefix('cake-types')
    ->group(function () {
        Route::get('/', [CakeTypeController::class, 'index'])
            ->name('index');
        Route::get('/{cakeType}', [CakeTypeController::class, 'show'])
            ->name('show');
        Route::get('/create', [CakeTypeController::class, 'create'])
            ->name('create');
        Route::get('/{cakeType}/edit', [CakeTypeController::class, 'edit'])
            ->name('edit');
    });
