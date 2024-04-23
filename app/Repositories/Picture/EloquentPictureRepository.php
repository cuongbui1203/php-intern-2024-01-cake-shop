<?php

namespace App\Repositories\Picture;

use App\Models\Picture;
use App\Repositories\EloquentBaseRepository;

class EloquentPictureRepository extends EloquentBaseRepository implements PictureRepository
{
    public function getModel()
    {
        return Picture::class;
    }
}
