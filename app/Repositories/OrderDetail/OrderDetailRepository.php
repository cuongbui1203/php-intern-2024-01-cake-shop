<?php

namespace App\Repositories\OrderDetail;

/**
 * @method mixed find(string $typeId)
 * @method mixed update(string $id,array $attributes)
 * @method mixed create(array $attributes)
 * @method mixed getAll()
 */
interface OrderDetailRepository
{
    public function deleteItem(string $orderId, string $id);

    public function updates(array $details);
}
