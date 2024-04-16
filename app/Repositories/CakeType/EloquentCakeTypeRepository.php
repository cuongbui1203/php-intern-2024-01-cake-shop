<?php

namespace App\Repositories\CakeType;

use App\Models\CakeType;
use App\Repositories\EloquentBaseRepository;

class EloquentCakeTypeRepository extends EloquentBaseRepository implements CakeTypeRepository
{
    public function getModel()
    {
        return CakeType::class;
    }

}
