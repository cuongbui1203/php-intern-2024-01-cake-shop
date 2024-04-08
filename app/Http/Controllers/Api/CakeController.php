<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddCakeRequest;
use App\Http\Requests\CreateCakeRequest;
use App\Http\Requests\GetListCakeRequest;
use App\Http\Requests\GetListRequest;
use App\Models\Cake;
use App\Models\CakeType;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CakeController extends BaseApiController
{
    public function getCakeByType(GetListRequest $request, CakeType $cakeType)
    {
        $page = $request->page ?? 1;
        $cakes = DB::table('cakes')
            ->where('type_id', $cakeType->id)
            ->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($cakes);
    }

    public function getAllCakes(GetListCakeRequest $request)
    {
        $page = $request->page ?? 1;
        $cakeType = json_decode($request->cakeType) ?? [];
        $cakes = DB::table('cakes');
        if (count($cakeType) > 0) {
            $cakes->whereIn('type_id', $cakeType);
        }

        if ($request->min) {
            $cakes->where('price', '>=', $request->min);
        }

        if ($request->max) {
            $cakes->where('price', '<=', $request->max);
        }

        // dd($cakes->r)
        $res = $cakes->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($res);
    }

    public function groupCakeByType()
    {
        $cakes = DB::table('cakes')
            ->leftJoin('cake_types', 'type_id', '=', 'cake_types.id')
            ->leftJoin('pictures', 'pictures.cake_id', '=', 'cakes.id')
            ->get([
                'cakes.*',
                DB::raw('cake_types.name as type'),
                DB::raw('pictures.id as img_id'),
            ])
            ->unique('id')
            ->groupBy('type_id');

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
        $cake->ingredients()->sync(json_decode($request->ingredients));

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

    public function store(CreateCakeRequest $request)
    {
        DB::table('cakes')->insert([
            'name' => $request->name,
            'description' => $request->description,
            'type_id' => $request->idCakeType,
            'price' => $request->price,
            'cook_time' => $request->cookTime,
            'amount' => 0,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function destroy(Cake $cake)
    {
        $pictures = $cake->pictures;
        foreach ($pictures as $picture) {
            try {
                Storage::get($picture->link);
                Storage::delete($picture->link);
            } catch (Exception $e) {
                dd($e);
            }

            DB::table('pictures')->where('id', '=', $picture->id)->delete();
        }

        DB::table('cakes')->where('id', '=', $cake->id)->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
