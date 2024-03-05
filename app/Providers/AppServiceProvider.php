<?php

namespace App\Providers;

use DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Builder::macro('paginateAnother', function ($page, $pageSize) {
            $total = $this->count();
            $data = $this->orderBy('id')->where('id', '>', ($page - 1) * $pageSize)->limit($pageSize)->get();
            $pictures = DB::table('pictures')->whereIn('cake_id', $data->pluck('id'))->get(['link', 'cake_id']);
            foreach ($data as $e) {
                $e->{'pictures'} = [];
                foreach ($pictures as $picture) {
                    if ($e->id === $picture->cake_id) {
                        array_push($e->pictures, $picture);
                    }
                }
            }

            $res = [];
            $res['data'] = $data;
            $res['total'] = $total;
            $res['pageSize'] = $pageSize;
            $res['currentPage'] = $page;

            return $res;
        });
    }
}
