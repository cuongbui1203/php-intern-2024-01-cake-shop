<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\EloquentBaseRepository;

class EloquentUserRepository extends EloquentBaseRepository implements UserRepository
{
    public function getModel()
    {
        return User::class;
    }
}
