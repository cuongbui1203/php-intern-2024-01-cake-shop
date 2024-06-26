<?php

namespace Database\Seeders;

use App\Models\Cake;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fakePhone = '0';
        for ($i = 0; $i < 10; $i++) {
            $fakePhone .= mt_rand(0, 9);
        }

        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'email_verified_at' => now(),
                'dob' => '2002-03-12',
                'phone' => $fakePhone,
                'address' => 'Ha noi',
                'role_id' => config('roles.admin'),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'employee',
                'email' => 'employee@admin.com',
                'email_verified_at' => now(),
                'dob' => '2002-03-12',
                'phone' => $fakePhone,
                'address' => 'Ha noi',
                'role_id' => config('roles.employee'),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user',
                'email' => 'user@admin.com',
                'email_verified_at' => now(),
                'dob' => '2002-03-12',
                'phone' => $fakePhone,
                'address' => 'Ha noi',
                'role_id' => config('roles.user'),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('users')->insert($users);

        $cakeIds = Cake::all('id')->pluck('id');

        User::factory(10)->create([
            'role_id' => 3,
        ]);
        User::all()->each(function ($e) use ($cakeIds) {
            $n = rand(2, 5);
            $cakeBuy = [];
            for ($i = 0; $i < $n; $i++) {
                $cakeId = $cakeIds->random();
                $cakeIds->filter(function ($e) use ($cakeId) {
                    return $e !== $cakeId;
                });
                array_push($cakeBuy, $cakeId);
                (new Review([
                    'user_id' => $e->id,
                    'cake_id' => $cakeId,
                    'rating' => random_int(0, 5),
                    'comment' => Str::random(),
                ]))->save();
            }

            $e->cakes()->sync($cakeBuy);
            $e->save();
        });
    }
}
