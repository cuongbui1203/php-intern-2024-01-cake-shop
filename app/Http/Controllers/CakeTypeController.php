<?php

namespace App\Http\Controllers;

use App\Models\CakeType;
use Inertia\Inertia;

class CakeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cakeTypes = CakeType::all()->load('cakes');

        return Inertia::render('CakeType/ListCakeType', compact('cakeTypes')); //phpcs:ignore
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('CakeType/CreateCakeType');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function show(CakeType $cakeType)
    {
        $cakeType->load('cakes');

        return Inertia::render('CakeType/CakeTypeDetail', compact('cakeType')); // phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function edit(CakeType $cakeType)
    {
        return Inertia::render('CakeType/Edit', compact('cakeType')); // phpcs:ignore
    }

    public function listCakes(CakeType $cakeType)
    {
        $cakeType->load('cakes');

        return Inertia::render('CakeType/ListCakesByType', compact('cakeType')); //phpcs:ignore
    }
}
