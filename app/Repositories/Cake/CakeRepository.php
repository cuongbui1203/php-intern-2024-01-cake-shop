<?php

namespace App\Repositories\Cake;

/**
 * @method mixed find(string $typeId)
 * @method bool update(string $id,array $attributes)
 * @method bool create(array $attributes)
 * @method bool delete(string $id)
 * @method mixer paginate(int $pageSize);
 * @method mixed getAll()
 */
interface CakeRepository
{
    public function getCakeByType(string $typeId);

    public function getAllCakesByFilter(array $typeIds, int $minPrice, int $maxPrice);

    public function groupCakeByType();

    public function updateIngredients(string $id, array $ingredients);

    public function updateCakeAmount(string $id, int $amount);

    public function getTop3();
}
