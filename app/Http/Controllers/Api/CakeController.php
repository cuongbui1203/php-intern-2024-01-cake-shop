<?php

namespace App\Http\Controllers\Api;

use App\Models\Cake;
use DB;
use Illuminate\Http\Request;

class CakeController extends BaseApiController
{
    public function getAllCakes(Request $request)
    {
        $cakes = DB::table('cakes')->paginate(config('paginate.pageSize.cakes'));

        return response()->json($cakes);
    }

    public function getCake(Cake $cake)
    {
        return response()->json($cake);
    }
}
