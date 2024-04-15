<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\Ingredient;
use Tests\Unit\ModelTestCase;

class IngredientTest extends ModelTestCase
{
    public function test_model_configuration()
    {
        $this->runConfigurationAssertions(new Ingredient(), ['name'], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_ingredient_be_long_to_many_cake()
    {
        $ingredient = new Ingredient();
        $cakes = $ingredient->cakes();
        $this->assertBelongsToManyRelation($cakes, $ingredient, new Cake(), 'cake_ingredient.ingredient_id', 'cake_ingredient.cake_id');
    }
}
