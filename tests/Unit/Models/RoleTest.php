<?php

namespace Tests\Unit\Models;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Tests\Unit\ModelTestCase;

class RoleTest extends ModelTestCase
{
    public function test_role_configuration()
    {
        $this->runConfigurationAssertions(new Role(), ['name'], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_role_belong_to_many_permission()
    {
        $role = new Role();
        $permissions = $role->permissions();
        $this->assertBelongsToManyRelation(
            $permissions,
            $role,
            new Permission(),
            'permission_role.role_id',
            'permission_role.permission_id'
        );
    }

    public function test_role_has_many_users()
    {
        $role = new Role();
        $users = $role->users();
        $this->assertHasManyRelation($users, $role, new User(), 'role_id', 'id');
    }
}
