<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status_id', config('statuses.buying'))->first();
        $order->load('details', 'details.cake');

        return Inertia::render('Cart/CartInfo', compact('order')); //phpcs:ignore
    }
}
