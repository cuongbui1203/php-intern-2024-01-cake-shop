<?php

namespace App\Http\Controllers\Api;

use App\Models\Cake;
use DB;
use Illuminate\Http\Request;

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
