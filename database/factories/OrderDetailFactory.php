<?php

namespace Database\Factories;

use App\Models\Cake;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $cakeIds = Cake::all(['id'])->pluck('id')->toArray();

        return [
            'cake_id' => $cakeIds[array_rand($cakeIds)],
            'amount' => rand(1, 10),
        ];
    }
}
