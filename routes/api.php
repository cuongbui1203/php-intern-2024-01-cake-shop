<?php

use App\Http\Controllers\Api\CakeController;
use App\Http\Controllers\Api\CakeTypeController;
use App\Http\Controllers\Api\PictureController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'currentUser']);

Route::post('/image/upload', [PictureController::class, 'store'])
    ->name('api.img.upload');
Route::get('/image/{picture}/show', [PictureController::class, 'show'])
    ->name('api.img.show');

Route::get('cakes', [CakeController::class, 'getAllCakes'])->name('api.cakes.all');
Route::get('cakes/{cake}', [CakeController::class, 'getCake'])->name('api.cakes.get');
Route::post('cakes/create', [CakeController::class, 'store'])->name('api.cakes.store');
Route::post('cakes/{cake}/update', [CakeController::class, 'update'])->name('api.cakes.update');
Route::post('cakes/{cake}/add-cake', [CakeController::class, 'addCake'])->name('api.cakes.addCake');

Route::post('cake-types/create', [CakeTypeController::class, 'store'])
    ->name('api.cake-types.store');
Route::delete('cake-types/{cakeType}/delete', [CakeTypeController::class, 'destroy'])
    ->name('api.cake-types.destroy');
Route::post('cake-types/{cakeType}/update', [CakeTypeController::class, 'update'])
    ->name('api.cake-types.update');
Route::get('cake-types/', [CakeTypeController::class, 'getListCakeType'])
    ->name('api.cake-types.get-list');
