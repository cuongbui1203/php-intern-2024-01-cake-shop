<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\Review;
use App\Models\User;
use Tests\Unit\ModelTestCase;

class ReviewTest extends ModelTestCase
{
    public function test_review_configuration()
    {
        $this->runConfigurationAssertions(new Review(), [
            'user_id',
            'cake_id',
            'rating',
            'comment',
        ]);
    }

    public function test_review_be_long_to_user()
    {
        $review = new Review();
        $reviewer = $review->reviewer();
        $this->assertBelongsToRelation($reviewer, $review, new User(), 'user_id', 'id');
    }

    public function test_review_be_long_to_cake()
    {
        $review = new Review();
        $cake = $review->cake();
        $this->assertBelongsToRelation($cake, $review, new Cake(), 'cake_id', 'id');
    }
}
