<?php

namespace App\Providers;

use App\Repositories\CakeType\CakeTypeRepository;
use App\Repositories\CakeType\EloquentCakeTypeRepository;
use App\Repositories\Cake\CakeRepository;
use App\Repositories\Cake\EloquentCakeRepository;
use App\Repositories\OrderDetail\EloquentOrderDetailRepository;
use App\Repositories\OrderDetail\OrderDetailRepository;
use App\Repositories\Order\EloquentOrderRepository;
use App\Repositories\Order\OrderRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->singleton(CakeRepository::class, EloquentCakeRepository::class);
        $this->app->singleton(OrderRepository::class, EloquentOrderRepository::class);
        $this->app->singleton(OrderDetailRepository::class, EloquentOrderDetailRepository::class);
        $this->app->singleton(CakeTypeRepository::class, EloquentCakeTypeRepository::class);
    }
}
