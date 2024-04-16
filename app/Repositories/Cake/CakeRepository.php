<?php

namespace App\Repositories\Cake;

/**
 * @method mixed find(string $id)
 * @method mixed update(string $id,array $attributes)
 * @method mixed create(array $attributes)
 * @method mixed delete(string $id)
 * @method mixed getAll(array $attributes = ['*])
 */
interface CakeRepository
{
    public function getCakeByType(string $typeId);

    public function getAllCakesByFilter(array $typeIds, int $minPrice, int $maxPrice);

    public function groupCakeByType();

    public function updateIngredients(string $id, array $ingredients);

    public function updateCakeAmount(string $id, int $amount);
}
