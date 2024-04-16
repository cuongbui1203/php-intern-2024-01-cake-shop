<?php

namespace App\Http\Controllers;

use App\Models\CakeType;
use App\Repositories\CakeType\CakeTypeRepository;
use Inertia\Inertia;

class CakeTypeController extends Controller
{
    protected CakeTypeRepository $cakeTypeRepository;

    public function __construct(CakeTypeRepository $cakeTypeRepository)
    {
        $this->cakeTypeRepository = $cakeTypeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cakeTypes = $this->cakeTypeRepository->getAll()->load('cakes');

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
     * @param  string  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function show(string $cakeType)
    {
        $cakeType = $this->cakeTypeRepository->find($cakeType)->load('cakes');

        return Inertia::render('CakeType/CakeTypeDetail', compact('cakeType')); // phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function edit(string $cakeType)
    {
        $cakeType = $this->cakeTypeRepository->find($cakeType);

        return Inertia::render('CakeType/Edit', compact('cakeType')); // phpcs:ignore
    }

    public function listCakes(string $cakeType)
    {
        $cakeType = $this->cakeTypeRepository->find($cakeType);
        $cakeType->load('cakes');

        return Inertia::render('CakeType/ListCakesByType', compact('cakeType')); //phpcs:ignore
    }
}
