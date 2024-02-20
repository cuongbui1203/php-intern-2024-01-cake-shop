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
            'name' => 'out-of-stock',
            'description' => 'het hang',
        ]);
        DB::table('statuses')->insert([
            'name' => 'accept',
            'description' => 'Nhan don',
        ]);
        DB::table('statuses')->insert([
            'name' => 'pending',
            'description' => 'dang lam',
        ]);
        DB::table('statuses')->insert([
            'name' => 'shipping',
            'description' => 'dang ship',
        ]);
        DB::table('statuses')->insert([
            'name' => 'done',
            'description' => 'hoan thanh',
        ]);
        DB::table('statuses')->insert([
            'name' => 'fail',
            'description' => 'that bai',
        ]);
        DB::table('statuses')->insert([
            'name' => 'cancel',
            'description' => 'huy don',
        ]);
    }
}
