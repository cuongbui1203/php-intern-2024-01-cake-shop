<?php

namespace App\Http\Controllers;

use App\Models\CakeType;
use Illuminate\Http\Request;
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
        $data = CakeType::all();
        return Inertia::render('Cake/ListCakeType', [
            'cakeTypes' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function show(CakeType $cakeType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function edit(CakeType $cakeType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CakeType $cakeType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CakeType $cakeType)
    {
        //
    }
}
