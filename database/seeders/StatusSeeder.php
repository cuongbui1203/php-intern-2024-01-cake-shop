<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statuses')->insert([
            'id' => config('statuses.outOfStock'),
            'name' => 'outOfStock',
            'description' => 'het hang',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.accept'),
            'name' => 'accept',
            'description' => 'Nhan don',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.pending'),
            'name' => 'pending',
            'description' => 'dang lam',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.shipping'),
            'name' => 'shipping',
            'description' => 'dang ship',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.done'),
            'name' => 'done',
            'description' => 'hoan thanh',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.fail'),
            'name' => 'fail',
            'description' => 'that bai',
        ]);
        DB::table('statuses')->insert([
            'id' => config('statuses.cancel'),
            'name' => 'cancel',
            'description' => 'huy don',
        ]);
    }
}
