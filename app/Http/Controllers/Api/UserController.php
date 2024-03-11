<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Auth\AdminRegisterRequest;
use App\Http\Requests\Auth\ChangeRoleRequest;
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

    public function destroy(User $user)
    {
        $user->tokens()->delete();

        $user->delete();

        return response()->json(['success' => true]);
    }

    public function storeEmployee(AdminRegisterRequest $request)
    {
        $user = new User();

        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->dob = $request->dob;
        $user->password = Hash::make($request->password);
        $user->role_id = config('roles.employee');

        $user->save();

        return redirect('/admin/users');
    }

    public function changeUserRole(ChangeRoleRequest $request, User $user)
    {
        $user->role_id = $request->roleId;
        $user->save();

        return response()->json(['success' => true]);
    }
}
