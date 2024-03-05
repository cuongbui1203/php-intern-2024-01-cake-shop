<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddCakeRequest;
use App\Http\Requests\CreateCakeRequest;
use App\Models\Cake;
use DB;
use Illuminate\Http\Request;

class CakeController extends BaseApiController
{
    public function getAllCakes(Request $request)
    {
        $page = $request->page ?? 1;
        $cakes = DB::table('cakes')->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($cakes);
    }

    public function getCake(Cake $cake)
    {
        return response()->json($cake);
    }

    public function update(CreateCakeRequest $request, Cake $cake)
    {
        DB::table('cakes')->where('id', '=', $cake->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'type_id' => $request->idCakeType,
            'price' => $request->price,
            'cook_time' => $request->cookTime,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function addCake(AddCakeRequest $request, Cake $cake)
    {
        DB::table('cakes')->where('id', '=', $cake->id)->update([
            'amount' => $cake->amount + $request->amount,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
