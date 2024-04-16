<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Ingredient\CreateIngredientRequest;
use App\Http\Requests\Ingredient\UpdateIngredientRequest;
use App\Repositories\Ingredient\IngredientRepository;

class IngredientController extends BaseApiController
{
    protected IngredientRepository $ingredientRepository;

    public function __construct(IngredientRepository $ingredientRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = $this->ingredientRepository->getAll(['id', 'name']);

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
        $this->ingredientRepository->create($request->only(['name']));

        return response()->json(['success' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Ingredient\UpdateIngredientRequest  $request
     * @param  string  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIngredientRequest $request, string $ingredient)
    {
        $this->ingredientRepository->update($ingredient, $request->only('name'));

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string $ingredient
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $ingredient)
    {
        $res = $this->ingredientRepository->delete($ingredient);
        return response()->json(['success' => $res]);
    }
}
