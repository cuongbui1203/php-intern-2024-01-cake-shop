<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Status;
use App\Models\User;
use Tests\Unit\ModelTestCase;

class OrderTest extends ModelTestCase
{
    public function test_order_configuration()
    {
        $this->runConfigurationAssertions(new Order(), [
            'user_id',
            'shipping_address',
            'shipping_phone',
            'status_id',
            'created_at',
            'finished_at',
        ], [], ['*'], [], [
            'finished_at' => 'datetime:Y/m/d H:i',
            'id' => 'int',
        ]);
    }

    public function test_order_be_long_to_user()
    {
        $order = new Order();
        $user = $order->user();
        $this->assertBelongsToRelation($user, $order, new User(), 'user_id', 'id');
    }

    public function test_order_be_long_to_status()
    {
        $order = new Order();
        $status = $order->status();
        $this->assertBelongsToRelation($status, $order, new Status(), 'status_id', 'id');
    }

    public function test_order_has_many_order_details()
    {
        $order = new Order();
        $details = $order->details();
        $this->assertHasManyRelation($details, $order, new OrderDetail(), 'order_id', 'id');
    }
}
