<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadPictureRequest;
use App\Models\Picture;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\UploadPictureRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(UploadPictureRequest $request)
    {
        $imagePath = $request->file('image')->store('local');
        $f = new Picture();
        $f->cake_id = $request->cakeId;
        $f->link = $imagePath;
        $f->save();

        return response()->json($f);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Picture $picture
     * @return \Illuminate\Http\Response
     */
    public function show(Picture $picture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Picture $picture
     * @return \Illuminate\Http\Response
     */
    public function edit(Picture $picture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Picture $picture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Picture $picture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Picture $picture)
    {
        //
    }
}
