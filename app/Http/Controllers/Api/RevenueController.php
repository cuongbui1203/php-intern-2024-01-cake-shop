<?php

namespace App\Http\Controllers\Api;

use App\Repositories\Order\OrderRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class RevenueController extends BaseApiController
{
    protected OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index(Request $request)
    {
        $now = new Carbon();
        if ($request->month) {
            $now->setMonth($request->month);
        }

        if ($request->year) {
            $now->setYear($request->year);
        }

        $totalOrders = $this->orderRepository->whereYear($now->year);

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

    public function getTotalAmountPerMonth(Request $request)
    {
        $start = new Carbon();
        $end = new Carbon();
        if ($request->startMonth) {
            $start->setMonth($request->startMonth);
        }

        if ($request->startYear) {
            $start->setYear($request->startYear);
        }

        if ($request->endMonth) {
            $end->setMonth($request->endMonth);
        }

        if ($request->endYear) {
            $end->setYear($request->endYear);
        }

        $start->startOfDay()->startOfMonth();
        $end->endOfDay()->endOfMonth();
        $totals = new Collection();

        $orders = $this->orderRepository->getTotalAmountPerMonth($start, $end)
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            })
            ->groupBy(function ($order) {
                return $order->finished_at->format('m/Y');
            })
            ->each(function ($ordersPerMonth) use (&$totals) {
                $total = 0;
                $ordersPerMonth->each(function ($order) use (&$total) {
                    $total += $order->total;
                });
                $totals->add($total);
            });
        $totals = $totals->reverse();
        $resTotals = [];
        $resLabels = [];
        for ($i = new Carbon($start); $i <= $end; $i->addMonth()) {
            if ($orders->has($i->format('m/Y'))) {
                array_push($resTotals, $totals->pop());
            } else {
                array_push($resTotals, 0);
            }

            array_push($resLabels, $i->format('m/Y'));
        }

        return response()->json([
            'success' => true,
            'totals' => $resTotals,
            'labels' => $resLabels,
        ]);
    }
}
