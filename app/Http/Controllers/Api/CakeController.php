<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddCakeRequest;
use App\Http\Requests\CreateCakeRequest;
use App\Http\Requests\GetListCakeRequest;
use App\Http\Requests\GetListRequest;
use App\Http\Requests\ReviewCakeRequest;
use App\Jobs\SendCakeReviewedMail;
use App\Models\Cake;
use App\Repositories\Cake\CakeRepository;
use App\Repositories\Review\ReviewRepository;

class CakeController extends BaseApiController
{
    protected CakeRepository $cakeRepository;
    protected ReviewRepository $reviewRepository;

    public function __construct(CakeRepository $cakeRepository, ReviewRepository $reviewRepository)
    {
        $this->cakeRepository = $cakeRepository;
        $this->reviewRepository = $reviewRepository;
    }

    public function getCakeByType(GetListRequest $request, string $cakeType)
    {
        $page = $request->page ?? 1;
        $cakes = $this->cakeRepository
            ->getCakeByType($cakeType)
            ->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($cakes);
    }

    public function getAllCakes(GetListCakeRequest $request)
    {
        $page = $request->page ?? 1;
        $cakeType = json_decode($request->cakeType) ?? [];

        $cakes = $this->cakeRepository->getAllCakesByFilter($cakeType, $request->min, $request->max);
        $res = $cakes->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($res);
    }

    public function groupCakeByType()
    {
        $cakes = $this->cakeRepository->groupCakeByType();

        return response()->json($cakes);
    }

    public function getCake(string $cake)
    {
        return response()->json($this->cakeRepository->find($cake));
    }

    public function update(CreateCakeRequest $request, string $cake)
    {
        $this->cakeRepository->update($cake, [
            'name' => $request->name,
            'description' => $request->description,
            'type_id' => $request->idCakeType,
            'price' => $request->price,
            'cook_time' => $request->cookTime,
        ]);
        $this->cakeRepository->updateIngredients($cake, json_decode($request->ingredients));

        return response()->json([
            'success' => true,
        ]);
    }

    public function addCake(AddCakeRequest $request, string $cake)
    {
        $this->cakeRepository->updateCakeAmount($cake, $request->amount);

        return response()->json([
            'success' => true,
        ]);
    }

    public function store(CreateCakeRequest $request)
    {
        $this->cakeRepository->create([
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

    public function destroy(string $cake)
    {
        $this->cakeRepository->destroy($cake);

        return response()->json([
            'success' => true,
        ]);
    }

    public function review(ReviewCakeRequest $request, Cake $cake)
    {
        $user = auth()->user();
        $review = $this->reviewRepository->create([
            'cake_id' => $cake->id,
            'user_id' => $user->id,
            'rating' => $request->rating,
            'comment' => $request->comment ?? '',
        ]);
        dispatch(new SendCakeReviewedMail($cake, $user->name, $review));

        return response()->json(['success' => true]);
    }
}
