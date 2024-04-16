<?php

namespace App\Repositories\Order;

use App\Models\User;
use Carbon\Carbon;

/**
 * @method mixed find(string $typeId)
 * @method mixed update(string $id,array $attributes)
 * @method mixed create(array $attributes)
 * @method mixed delete(string $id)
 * @method mixed getAll()
 */
interface OrderRepository
{
    public function getOrderBuying(User $user);

    public function updateStatus(string $id, string $statusId);

    public function whereYear($year, array $attributes = ['*']);

    public function getTotalAmountPerMonth(Carbon $start, Carbon $end);
}
