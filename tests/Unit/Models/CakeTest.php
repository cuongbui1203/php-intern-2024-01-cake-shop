<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\CakeType;
use App\Models\Ingredient;
use App\Models\Picture;
use App\Models\Review;
use App\Models\User;
use Tests\Unit\ModelTestCase;

class CakeTest extends ModelTestCase
{
    public function test_model_configuration()
    {
        $cake = new Cake();
        $this->runConfigurationAssertions(
            $cake,
            [
                'name',
                'description',
                'type_id',
                'price',
                'amount',
                'cook_time',
            ],
            [],
            ['*'],
            [],
            [
                'updated_at' => 'timestamp',
                'created_at' => 'timestamp',
                'id' => 'int',
            ]
        );
        $this->assertTrue($cake->hasAppended('rating'));
    }

    public function test_cake_be_long_to_type()
    {
        $cake = new Cake();
        $type = $cake->type();
        $this->assertBelongsToRelation($type, $cake, new CakeType(), 'type_id', 'id');
    }

    public function test_cake_be_long_to_many_ingredients()
    {
        $cake = new Cake();
        $ingredients = $cake->ingredients();
        $this->assertBelongsToManyRelation(
            $ingredients,
            $cake,
            new Ingredient(),
            'cake_ingredient.cake_id',
            'cake_ingredient.ingredient_id'
        );
    }

    public function test_cake_has_many_pictures()
    {
        $cake = new Cake();
        $pictures = $cake->pictures();
        $this->assertHasManyRelation($pictures, $cake, new Picture(), 'cake_id', 'id');
    }

    public function test_cake_be_long_to_many_buyers()
    {
        $cake = new Cake();
        $buyers = $cake->buyers();
        $this->assertBelongsToManyRelation($buyers, $cake, new User(), 'cake_user.cake_id', 'cake_user.user_id');
    }

    public function test_cake_has_many_reviews()
    {
        $cake = new Cake();
        $reviews = $cake->reviews();
        $this->assertHasManyRelation($reviews, $cake, new Review(), 'cake_id', 'id');
    }

    public function test_cake_has_attribute_rating()
    {
        $cake = new Cake();

        $this->assertEquals(0, $cake->rating);

        $reviews = Review::factory(10)->make(['rating' => 1])->each(function ($review) {
            $review->rating = rand(1, 5);
        });

        $expected = $reviews->pluck('rating')->sum() / 10;
        $cake->setRelation('reviews', $reviews);
        $this->assertEquals($expected, $cake->rating);
    }

    public function test_cake_has_avatar()
    {
        $cake = new Cake();

        $pictures = Picture::factory(2)->make();

        $cake->setRelation('pictures', $pictures);
        $expected = $pictures->first();

        $this->assertEquals($expected, $cake->avatar());
    }
}
