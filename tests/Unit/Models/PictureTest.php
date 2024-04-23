<?php

namespace Tests\Unit\Models;

use App\Models\Cake;
use App\Models\Picture;
use Tests\Unit\ModelTestCase;

class PictureTest extends ModelTestCase
{
    public function test_picture_configuration()
    {
        $this->runConfigurationAssertions(new Picture(), [
            'cake_id',
            'link',
        ], [], ['*'], [], [
            'updated_at' => 'timestamp',
            'created_at' => 'timestamp',
            'id' => 'int',
        ]);
    }

    public function test_picture_be_long_to_cake()
    {
        $picture = new Picture();
        $cake = $picture->cake();
        $this->assertBelongsToRelation($cake, $picture, new Cake(), 'cake_id', 'id');
    }
}
