<?php

namespace App\Repositories\OrderDetail;

use App\Models\OrderDetail;
use App\Repositories\EloquentBaseRepository;

class EloquentOrderDetailRepository extends EloquentBaseRepository implements OrderDetailRepository
{
    public function getModel()
    {
        return OrderDetail::class;
    }

    public function deleteItem(string $orderId, string $id)
    {
        $detail = $this->model->where('order_id', $orderId)
            ->where('id', $id)->first();
        if ($detail) {
            $detail->delete();

            return true;
        }

        return false;
    }

    public function updates(array $details)
    {
        foreach ($details as $key => $value) {
            $detail = $this->model->find($key);
            $detail->amount = $value;
            $detail->cake->buy_count++;
            $detail->cake->amount -= $value;
            $detail->cake->save();
            $detail->save();
        }
    }
}
