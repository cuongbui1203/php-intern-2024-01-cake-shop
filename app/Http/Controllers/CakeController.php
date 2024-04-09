<?php

namespace App\Http\Controllers;

use App\Repositories\Cake\CakeRepository;
use Inertia\Inertia;

class CakeController extends Controller
{
    protected CakeRepository $cakeRepository;

    public function __construct(CakeRepository $cakeRepository)
    {
        $this->cakeRepository = $cakeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cakes = $this->cakeRepository->paginate(config('paginate.pageSize.cakes'));

        return Inertia::render('Cake/ListCakes', compact('cakes')); //phpcs:ignore
    }

    public function adminIndex()
    {
        $cakes = $this->cakeRepository->paginate(config('paginate.pageSize.cakes'));

        return Inertia::render('Admin/ListCakes', compact('cakes')); //phpcs:ignore
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Cake/Create');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $cake
     * @return \Illuminate\Http\Response
     */
    public function show(string $cake)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $cake = $this->cakeRepository->find($cake);
        $cake->load(['type', 'pictures', 'ingredients:id,name', 'reviews.reviewer:id,name']);
        $canReview = !is_null($user) && ($user->cakes->contains($cake->id) || $user->role_id === config('roles.admin')); //phpcs:ignore

        return Inertia::render('Cake/Details', compact('cake', 'canReview')); //phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $cake
     * @return \Illuminate\Http\Response
     */
    public function edit(string $cake)
    {
        $cake = $this->cakeRepository->find($cake);
        $cake->load(['pictures', 'ingredients']);

        return Inertia::render('Cake/Edit', compact('cake')); //phpcs:ignore
    }
}
