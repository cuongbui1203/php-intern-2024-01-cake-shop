<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RevenueController extends BaseApiController
{
    public function index(Request $request)
    {
        $now = new Carbon();
        if ($request->month) {
            $now->setMonth($request->month);
        }

        if ($request->year) {
            $now->setYear($request->year);
        }

        $totalOrders = Order::where(DB::raw('YEAR(created_at)'), '=', $now->year)
            ->get();

        $ordersPerMonth = $totalOrders->groupBy(function ($order) {
            return $order->created_at->format('m/Y');
        });
        $orders = $totalOrders->where('status_id', '!=', config('statuses.buying'))
            ->whereNotNull('finished_at')
            ->filter(function ($order) use ($now) {
                $dayStart = new Carbon($now->startOfDay()->startOfMonth());
                $dayEnd = $now->endOfDay()->endOfMonth();

                return $order->finished_at->gte($dayStart) && $order->finished_at->lte($dayEnd);
            })
            ->load('details', 'details.cake:id,price', 'user:id,name')
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            });

        return response()->json([
            'success' => true,
            'ordersPerMonth' => $ordersPerMonth->toArray(),
            'orders' => $orders->toArray(),
        ]);
    }
}
