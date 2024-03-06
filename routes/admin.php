<?php

use App\Http\Controllers\CakeController;
use App\Http\Controllers\CakeTypeController;
use Illuminate\Support\Facades\Route;

Route::name('.cakes')
    ->prefix('cakes')
    ->group(function () {
        Route::get('/', [CakeController::class, 'adminIndex'])
            ->name('.index');
        Route::get('/create', [CakeController::class, 'create'])
            ->name('.create');
        Route::get('/{cake}/edit', [CakeController::class, 'edit'])
            ->name('.edit');
        Route::get('/{cake}/add-cake', [CakeController::class, 'addCake'])
            ->name('.addCake');
    });

Route::name('.cake-types')
    ->prefix('cake-types')
    ->group(function () {
        Route::get('/create', [CakeTypeController::class, 'create'])
            ->name('.create');
        Route::get('/{cakeType}/edit', [CakeTypeController::class, 'edit'])
            ->name('.edit');
    });
