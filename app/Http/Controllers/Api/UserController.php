<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseApiController
{
    public function currentUser(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
        ], 200);
    }

    public function updatePassword(ChangePasswordRequest $request, User $user)
    {
        if (Hash::check($request->oldPassword, $user->password)) {
            $user->password = Hash::make($request->getPassword());
            $user->save();

            return response()->json([
                'success' => true,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => __('passwords.notMatch'),
        ], Response::HTTP_NOT_FOUND);
    }
}
