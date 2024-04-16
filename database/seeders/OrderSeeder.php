<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory(rand(10, 50))
            ->create()->each(function ($order) {
            if ($order->status_id === config('statuses.done')) {
                $order->finished_at = now();
            }

            OrderDetail::factory(rand(1, 10))
                ->create(['order_id' => 1])
                ->each(function ($detail) use ($order) {
                    $detail->order_id = $order->id;
                    $detail->save();
                });
            $order->save();
        });
        Order::factory(1)
            ->create([
                'status_id' => config('statuses.buying'),
                'user_id' => 1,
            ])->each(function ($order) {
            OrderDetail::factory(rand(1, 10))
                ->create(['order_id' => 1])
                ->each(function ($detail) use ($order) {
                    $detail->order_id = $order->id;
                    $detail->save();
                });
        });
    }
}
