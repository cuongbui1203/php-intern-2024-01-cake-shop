<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CakeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(100000, 2000000),
            'amount' => $this->faker->numberBetween(0, 100),
            'cook_time' => $this->faker->numberBetween(0, 60),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
