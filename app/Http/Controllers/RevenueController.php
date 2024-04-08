<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RevenueController extends Controller
{
    public function index()
    {
        return Inertia::render('Revenue/Dashboard');
    }
}
