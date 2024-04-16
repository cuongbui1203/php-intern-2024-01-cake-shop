<?php

namespace Tests\Unit\Models;

use App\Models\Permission;
use App\Models\Role;
use Tests\Unit\ModelTestCase;

class PermissionTest extends ModelTestCase
{
    public function test_permission_configuration()
    {
        $this->runConfigurationAssertions(new Permission(), ['name'], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_permission_be_long_to_many_role()
    {
        $permission = new Permission();
        $roles = $permission->roles();
        $this->assertBelongsToManyRelation(
            $roles,
            $permission,
            new Role(),
            'permission_role.permission_id',
            'permission_role.role_id'
        );
    }
}
