<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('status_id', config('statuses.buying'))
            ->first();
        if (!$order) {
            $order = new Order();
            $order->user_id = $user->id;
            $order->shipping_address = $user->address;
            $order->shipping_phone = $user->phone;
            $order->status_id = config('statuses.buying');
            $order->save();
        }

        $order->load(['details', 'details.cake', 'details.cake.pictures']);

        return response()->json($order);
    }

    public function deleteItem(Order $order, OrderDetail $orderDetail)
    {
        if ($orderDetail->order_id === $order->id) {
            $orderDetail->delete();

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }
}
