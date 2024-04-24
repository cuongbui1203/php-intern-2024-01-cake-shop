<?php

namespace Tests\Unit\Repositories\Order;

use App\Models\Order;
use App\Models\User;
use App\Repositories\Order\EloquentOrderRepository;
use Database\Seeders\RoleSeeder;
use Database\Seeders\StatusSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;

class OrderRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $order;
    protected $order2;
    protected $user;
    protected $orderRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);
        $this->seed(StatusSeeder::class);
        $this->user = User::factory()->create([
            'role_id' => 1,
        ]);
        $this->order = Order::factory()->create([
            'id' => 1,
            'user_id' => $this->user->id,
            'status_id' => config('statuses.buying'),
            'finished_at' => null,
        ]);
        $this->order2 = Order::factory()->create([
            'id' => 2,
            'user_id' => $this->user->id,
            'status_id' => config('statuses.cancel'),
            'finished_at' => now(),
        ]);
        $this->orderRepository = new EloquentOrderRepository();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        unset($this->order);
        unset($this->order2);

        unset($this->user);

        parent::tearDown();
    }

    public function test_get_order_buying()
    {
        $actual = $this->orderRepository->getOrderBuying($this->user);
        $this->assertEquals($this->order->getAttributes(), $actual->getAttributes());
    }

    public function test_change_order_status_success()
    {
        $actual = $this->orderRepository->updateStatus('1', config('statuses.pending'));
        $this->assertTrue($actual);
        $order = Order::find(1);
        $this->assertEquals($order->status_id, config('statuses.pending'));
    }

    public function test_change_order_status_fail()
    {
        $actual = $this->orderRepository->updateStatus('2', config('statuses.pending'));
        $this->assertFalse($actual);
        $order = Order::find(2);
        $this->assertNotEquals($order->status_id, config('statuses.pending'));
    }
}
