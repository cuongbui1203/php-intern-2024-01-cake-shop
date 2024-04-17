<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Auth\AdminRegisterRequest;
use App\Http\Requests\Auth\ChangeRoleRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseApiController
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function currentUser(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
        ], 200);
    }

    public function updatePassword(ChangePasswordRequest $request, string $user)
    {
        $user = $this->userRepository->find($user);

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

    public function destroy(string $user)
    {
        $user = $this->userRepository->find($user);
        $user->tokens()->delete();

        $user->delete();

        return response()->json(['success' => true]);
    }

    public function storeEmployee(AdminRegisterRequest $request)
    {

        $attributes = $request->only([
            'name',
            'phone',
            'email',
            'address',
            'dob',
        ]);
        $attributes['password'] = Hash::make($request->password);
        $attributes['role_id'] = config('roles.employee');

        $this->userRepository->create($attributes);

        return redirect('/admin/users');
    }

    public function changeUserRole(ChangeRoleRequest $request, string $user)
    {
        $user = $this->userRepository->find($user);
        $user->role_id = $request->roleId;
        $user->save();

        return response()->json(['success' => true]);
    }

    public function update(UpdateUserRequest $request, string $user)
    {
        $attributes = $request->only([
            'name',
            'dob',
            'address',
            'phone',
        ]);
        if ($request->changeMail) {
            $attributes['email'] = $request->email;
        }
        $this->userRepository->update($user, $attributes);

        return response()->json(['success' => true]);
    }
}
