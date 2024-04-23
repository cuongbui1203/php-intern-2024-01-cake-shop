<?php

namespace App\Http\Controllers;

use App\Repositories\User\UserRepository;
use Inertia\Inertia;

class UserController extends Controller
{
    public UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->userRepository
            ->getAll(['id', 'name', 'email', 'role_id']);
        $users->load('role');

        return Inertia::render('Admin/ListAccount', compact('users')); //phpcs:ignore
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Auth/RegisterEmployee');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $user
     * @return \Illuminate\Http\Response
     */
    public function show(string $user)
    {
        $user = $this->userRepository->find($user);
        $user->load('role');

        return Inertia::render('Auth/User', compact('user')); //phpcs:ignore
    }

    public function changePass(string $user)
    {
        $user = $this->userRepository->find($user);

        return Inertia::render('Auth/ChangePassword', compact('user')); //phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(string $user)
    {
        $user = $this->userRepository->find($user);

        return Inertia::render('Auth/Edit', compact('user')); //phpcs:ignore
    }
}
