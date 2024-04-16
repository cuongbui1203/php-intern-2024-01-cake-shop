<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\Order;
use App\Models\OrderDetail;
use Tests\Unit\ModelTestCase;

class OrderDetailTest extends ModelTestCase
{
    public function test_order_detail_configuration()
    {
        $this->runConfigurationAssertions(new OrderDetail(), [
            'order_id',
            'cake_id',
            'amount',
            'note',
        ], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_order_detail_be_long_to_order()
    {
        $detail = new OrderDetail();
        $order = $detail->order();
        $this->assertBelongsToRelation($order, $detail, new Order(), 'order_id', 'id');
    }

    public function test_order_detail_be_long_to_cake()
    {
        $detail = new OrderDetail();
        $cake = $detail->cake();
        $this->assertBelongsToRelation($cake, $detail, new Cake(), 'cake_id', 'id');
    }
}
