<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'id' => config('roles.admin'),
            'name' => 'admin',
        ]);
        DB::table('roles')->insert([
            'id' => config('roles.employee'),
            'name' => 'employee',
        ]);
        DB::table('roles')->insert([
            'id' => config('roles.user'),
            'name' => 'user',
        ]);
    }
}
