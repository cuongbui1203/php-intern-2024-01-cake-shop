<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakePhone = '0';
        for ($i = 0; $i < 10; $i++) {
            $fakePhone .= mt_rand(0, 9);
        }

        $userIds = User::all(['id'])->pluck('id')->toArray();
        $statusIds = Status::all(['id'])->pluck('id')->toArray();

        return [
            'user_id' => $userIds[array_rand($userIds)],
            'shipping_address' => $this->faker->address(),
            'shipping_phone' => $fakePhone,
            'status_id' => $statusIds[array_rand($statusIds)],
            'note' => $this->faker->text(),
        ];
    }
}
