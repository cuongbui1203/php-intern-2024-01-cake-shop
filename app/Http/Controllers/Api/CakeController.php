<?php

namespace App\Http\Controllers\Api;

use App\Models\Cake;
use Illuminate\Http\Request;
use DB;

class CakeController extends BaseApiController
{
    public function getAllCakes(Request $request)
    {
        return DB::table('cakes')->paginate(2);
    }

    public function getCake(Cake $cake)
    {
        return $cake;
    }
}
