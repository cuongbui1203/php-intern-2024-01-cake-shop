<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateCakeTypeRequest;
use App\Http\Requests\UpdateCakeTypeRequest;
use App\Models\CakeType;
use Exception;

class CakeTypeController extends BaseApiController
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateCakeTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCakeTypeRequest $request)
    {
        $cakeType = new CakeType();
        $cakeType->name = $request->name;
        $cakeType->description = $request->description;
        $cakeType->save();

        return response()->json([
            'success' => true,
            'data' => $cakeType,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCakeTypeRequest  $request
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCakeTypeRequest $request, CakeType $cakeType)
    {
        $cakeType->name = $request->name;
        $cakeType->description = $request->description;
        $cakeType->save();

        return response()->json([
            'success' => true,
            'message' => __('responseMessage.updateSuccess'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CakeType  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CakeType $cakeType)
    {
        try {
            $cakeType->deleteOrFail();

            return response()->json([
                'success' => true,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage(),
                'message' => __('responseMessage.deleteFail'),
            ]);
        }
    }

    public function getListCakeType()
    {
        $cakeTypes = CakeType::all(['id', 'name']);

        return response()->json([
            'success' => true,
            'data' => $cakeTypes,
        ]);
    }
}
