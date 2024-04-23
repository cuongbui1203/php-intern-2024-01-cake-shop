<?php

namespace App\Repositories\Review;

use App\Models\Review;
use App\Repositories\EloquentBaseRepository;

class EloquentReviewRepository extends EloquentBaseRepository implements ReviewRepository
{
    public function getModel()
    {
        return Review::class;
    }
}
