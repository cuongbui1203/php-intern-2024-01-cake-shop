<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddItemToCartRequest;
use App\Http\Requests\ConfirmOrderRequest;
use App\Http\Requests\UpdateStatusOrderRequest;
use App\Repositories\Order\OrderRepository;
use App\Repositories\OrderDetail\OrderDetailRepository;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CartController extends BaseApiController
{
    protected OrderRepository $orderRepository;
    protected OrderDetailRepository $orderDetailRepository;

    public function __construct(OrderRepository $orderRepository, OrderDetailRepository $orderDetailRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->orderDetailRepository = $orderDetailRepository;
    }

    public function index()
    {
        $user = auth()->user();
        $order = $this->orderRepository->getOrderBuying($user);

        return response()->json($order);
    }

    public function deleteItem(string $order, string $orderDetail)
    {
        $res = $this->orderDetailRepository->deleteItem($order, $orderDetail);

        return response()->json(['success' => $res]);
    }

    public function addItem(AddItemToCartRequest $request)
    {
        $user = Auth::user();
        $order = $this->orderRepository->getOrderBuying($user);
        $details = $order->details;
        foreach ($details as $e) {
            if ($e->cake_id === $request->cakeId) {
                $e->amount++;
                $e->save();

                return response()->json(['success' => true]);
            }
        }

        $this->orderDetailRepository->create([
            'order_id' => $order->id,
            'cake_id' => $request->cakeId,
            'amount' => $request->amount,
        ]);

        return response()->json(['success' => true], Response::HTTP_CREATED);
    }

    public function buy(ConfirmOrderRequest $request, string $order)
    {
        $details = (array) json_decode($request->details);

        $this->orderDetailRepository->updates($details);

        $this->orderRepository->update($order, [
            'shipping_address' => $request->shipping_address,
            'shipping_phone' => $request->shipping_phone,
            'note' => $request->note,
            'status_id' => config('statuses.pending'),
        ]);

        return response()->json([
            'success' => true,
        ], 200);
    }

    public function updateStatus(UpdateStatusOrderRequest $request, string $order)
    {
        $res = $this->orderRepository->updateStatus($order, $request->status_id);

        return response()->json(['success' => $res]);
    }
}
