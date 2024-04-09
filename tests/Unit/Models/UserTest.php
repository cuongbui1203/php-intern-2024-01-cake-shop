<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\Review;
use App\Models\Role;
use App\Models\User;
use Tests\Unit\ModelTestCase;

class UserTest extends ModelTestCase
{
    public function test_user_configuration()
    {
        $this->runConfigurationAssertions(
            new User(),
            [
                'name',
                'email',
                'password',
                'phone',
                'dob',
                'address',
                'role_id',
                'promotion',
            ],
            [
                'password',
                'remember_token',
            ],
            ['*'],
            [],
            [
                'email_verified_at' => 'datetime',
                'created_at' => 'timestamp',
                'updated_at' => 'timestamp',
                'id' => 'int',
            ]
        );
    }

    public function test_user_be_long_to_role()
    {
        $user = new User();
        $role = $user->role();
        $this->assertBelongsToRelation($role, $user, new Role(), 'role_id', 'id');
    }

    public function test_user_has_many_reviews()
    {
        $user = new User();
        $reviews = $user->reviews();

        $this->assertHasManyRelation($reviews, $user, new Review(), 'user_id', 'id');
    }

    public function test_user_belong_to_cake()
    {
        $user = new User();
        $cakes = $user->cakes();
        $this->assertBelongsToManyRelation($cakes, $user, new Cake(), 'cake_user.user_id', 'cake_user.cake_id');
    }
}
