<?php

namespace App\Http\Controllers;

use App\Repositories\Cake\CakeRepository;
use Inertia\Inertia;

class RevenueController extends Controller
{
    protected CakeRepository $cakeRepository;

    public function __construct(CakeRepository $cakeRepository)
    {
        $this->cakeRepository = $cakeRepository;
    }

    public function index()
    {
        $topCakes = $this->cakeRepository->getTop3();

        return Inertia::render('Revenue/Dashboard', compact('topCakes')); //phpcs:ignore
    }
}
