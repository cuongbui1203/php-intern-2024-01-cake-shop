<?php

namespace App\Repositories\Order;

use App\Models\User;

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
}
