<?php

namespace App\Http\Controllers;

use App\Repositories\Ingredient\IngredientRepository;
use Inertia\Inertia;

class IngredientController extends Controller
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
        $ingredients = $this->ingredientRepository->getAll();

        return Inertia::render('Admin/ListIngredients', compact('ingredients')); //phpcs:ignore
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Ingredient/Create');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function show(string $ingredient)
    {
        $ingredient = $this->ingredientRepository->find($ingredient);
        $ingredient->load('cakes');

        return Inertia::render('Ingredient/Detail', compact('ingredient')); //phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $ingredient
     * @return \Illuminate\Http\Response
     */
    public function edit(string $ingredient)
    {
        $ingredient = $this->ingredientRepository->find($ingredient);

        return Inertia::render("Ingredient/Edit", compact('ingredient')); //phpcs:ignore
    }
}
