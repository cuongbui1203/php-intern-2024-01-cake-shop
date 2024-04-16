<?php

namespace App\Repositories\Ingredient;

use App\Models\Ingredient;
use App\Repositories\EloquentBaseRepository;

class EloquentIngredientRepository extends EloquentBaseRepository implements IngredientRepository
{
    public function getModel()
    {
        return Ingredient::class;
    }

    public function delete(string $id)
    {
        /** @var Ingredient $ingredient */
        $ingredient = $this->find($id);

        if (count($ingredient->cakes) === 0) {
            $ingredient->delete();

            return true;
        }

        return false;
    }
}
