<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\CakeType;
use Tests\Unit\ModelTestCase;

class CakeTypeTest extends ModelTestCase
{
    public function test_model_configuration()
    {
        $this->runConfigurationAssertions(new CakeType(), [
            'name',
            'description',
        ], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_cake_type_has_many_cake()
    {
        $cakeType = new CakeType();
        $cakes = $cakeType->cakes();
        $this->assertHasManyRelation($cakes, $cakeType, new Cake(), 'type_id', 'id');
    }
}
