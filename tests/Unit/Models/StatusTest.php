<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use App\Models\Status;
use Tests\Unit\ModelTestCase;

class StatusTest extends ModelTestCase
{
    public function test_status_configuration()
    {
        $this->runConfigurationAssertions(new Status(), [
            'name',
            'description',
        ], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_status_has_many_orders()
    {
        $status = new Status();
        $orders = $status->orders();
        $this->assertHasManyRelation($orders, $status, new Order(), 'status_id', 'id');
    }
}
