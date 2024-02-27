<?php

use App\Http\Controllers\Api\CakeController;
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

Route::get('cakes', [CakeController::class, 'getAllCakes'])->name('api.cakes.all');
Route::get('cakes/{cake}', [CakeController::class, 'getCake'])->name('api.cakes.get');
