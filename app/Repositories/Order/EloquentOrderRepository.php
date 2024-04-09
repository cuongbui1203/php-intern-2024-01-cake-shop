<?php

namespace App\Repositories\Order;

use App\Models\Order;
use App\Models\User;
use App\Repositories\EloquentBaseRepository;

class EloquentOrderRepository extends EloquentBaseRepository implements OrderRepository
{
    public function getModel()
    {
        return Order::class;
    }

    public function getOrderBuying(User $user)
    {
        $order = $this->model->where('user_id', '=', $user->id)
            ->where('status_id', config('statuses.buying'))
            ->first();
        if (!$order) {
            $order = new Order();
            $order->user_id = $user->id;
            $order->shipping_address = $user->address;
            $order->shipping_phone = $user->phone;
            $order->status_id = config('statuses.buying');
            $order->save();
        }

        $order->load(['details', 'details.cake', 'details.cake.pictures']);

        return $order;
    }

    public function updateStatus(string $id, string $statusId)
    {
        $order = $this->model->find($id);
        if (
            $order->status_id === config('statuses.done')
            || $order->status_id === config('statuses.cancel')
            || $order->status_id === config('statuses.fail')
        ) {
            return false;
        }

        $order->status_id = $statusId;
        if (
            $statusId === config('statuses.done')
            || $statusId === config('statuses.cancel')
            || $statusId === config('statuses.fail')
        ) {
            $order->finished_at = now();
        }

        $order->save();

        return true;
    }
}
