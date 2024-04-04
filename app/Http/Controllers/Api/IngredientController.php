<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Ingredient\CreateIngredientRequest;
use App\Http\Requests\Ingredient\UpdateIngredientRequest;
use App\Models\Ingredient;

class IngredientController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::all(['id', 'name']);

        return response()->json([
            'success' => true,
            'data' => $ingredients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Ingredient\CreateIngredientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateIngredientRequest $request)
    {
        $ingredient = new Ingredient();
        $ingredient->name = $request->name;

        $ingredient->save();

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ingredient  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function show(Ingredient $ingredient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Ingredient\UpdateIngredientRequest  $request
     * @param  \App\Models\Ingredient  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIngredientRequest $request, Ingredient $ingredient)
    {
        $ingredient->name = $request->name;
        $ingredient->save();

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ingredient  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ingredient $ingredient)
    {
        if (count($ingredient->cakes) === 0) {
            $ingredient->delete();

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }
}
