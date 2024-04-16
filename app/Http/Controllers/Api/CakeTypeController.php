<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateCakeTypeRequest;
use App\Http\Requests\UpdateCakeTypeRequest;
use App\Repositories\CakeType\CakeTypeRepository;

class CakeTypeController extends BaseApiController
{
    protected CakeTypeRepository $cakeTypeRepository;

    public function __construct(CakeTypeRepository $cakeTypeRepository)
    {
        $this->cakeTypeRepository = $cakeTypeRepository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateCakeTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCakeTypeRequest $request)
    {
        $cakeType = $this->cakeTypeRepository->create($request->only(['name', 'description']));

        return response()->json([
            'success' => true,
            'data' => $cakeType,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCakeTypeRequest  $request
     * @param  string  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCakeTypeRequest $request, string $cakeType)
    {
        $res = $this->cakeTypeRepository->update($cakeType, $request->only(['name', 'description']));
        if ($res) {
            return response()->json([
                'success' => true,
                'message' => __('responseMessage.updateSuccess'),
            ]);
        }

        return response()->json(['success' => false], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $cakeType
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $cakeType)
    {
        $res = $this->cakeTypeRepository->delete($cakeType);
        if ($res) {
            return response()->json([
                'success' => true,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => __('responseMessage.deleteFail'),
        ]);
    }

    public function getListCakeType()
    {
        $cakeTypes = $this->cakeTypeRepository->getAll(['id', 'name']);

        return response()->json([
            'success' => true,
            'data' => $cakeTypes,
        ]);
    }
}
