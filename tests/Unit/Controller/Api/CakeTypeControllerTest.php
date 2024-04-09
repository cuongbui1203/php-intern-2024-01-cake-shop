<?php

namespace Tests\Unit\Controller\Api;

use App\Http\Controllers\Api\CakeTypeController;
use App\Http\Requests\CreateCakeTypeRequest;
use App\Http\Requests\UpdateCakeTypeRequest;
use App\Models\User;
use App\Repositories\CakeType\EloquentCakeTypeRepository;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Mockery;
use Tests\TestCase;

class CakeTypeControllerTest extends TestCase
{
    protected $cakeTypeRepository;
    protected $cakeTypeController;
    protected $user;
    protected Carbon $time;

    protected function setUp(): void
    {
        parent::setUp();
        $this->time = now();
        $this->cakeTypeRepository = Mockery::mock(EloquentCakeTypeRepository::class);
        $this->cakeTypeController = new CakeTypeController($this->cakeTypeRepository);
        $this->user = User::factory()->make([
            'email_verified_at' => null,
            'role_id' => config('roles.admin'),
        ]);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        unset($this->cakeTypeController);
        unset($this->user);
        unset($this->time);
        parent::tearDown();
    }

    public function test_create_new_cake_type_success()
    {
        $dummyData = [
            'id' => 1,
            'name' => 'cake type test',
            'description' => 'description test',
            'created_at' => $this->time->toString(),
            'updated_at' => $this->time->toString(),
        ];

        $this->cakeTypeRepository->shouldReceive('create')
            ->with([
                'name' => 'cake type test',
                'description' => 'description test',
            ])
            ->once()
            ->andReturn($dummyData);

        $request = CreateCakeTypeRequest::create(
            '/api/cake-types',
            'POST',
            [
                'name' => 'cake type test',
                'description' => 'description test',
            ]
        );
        /** @var JsonResponse $actual*/
        $actual = $this->cakeTypeController->store($request);
        $this->assertInstanceOf(JsonResponse::class, $actual);
        $actualData = $actual->getData();
        $this->assertEquals(true, $actualData->success);
        $this->assertEquals((object) $dummyData, $actualData->data);
    }

    public function test_update_cake_type_success()
    {
        $this->cakeTypeRepository->shouldReceive('update')
            ->once()
            ->with(Mockery::type('string'), Mockery::type('array'))
            ->andReturn(1);

        $request = UpdateCakeTypeRequest::create(
            'api/cake-types/',
            'PUT',
            [
                'name' => 'cake type',
                'description' => 'description',
            ]
        );
        $actual = $this->cakeTypeController->update($request, 1);
        $this->assertInstanceOf(JsonResponse::class, $actual);
        $this->assertEquals(true, $actual->getData()->success);
    }

    public function test_update_cake_type_fail()
    {
        $this->cakeTypeRepository->shouldReceive('update')
            ->once()
            ->with(Mockery::type('string'), Mockery::type('array'))
            ->andReturn(false);

        $request = UpdateCakeTypeRequest::create(
            'api/cake-types/',
            'PUT',
            [
                'name' => 'cake type',
                'description' => 'description',
            ]
        );
        $actual = $this->cakeTypeController->update($request, 1);
        $this->assertInstanceOf(JsonResponse::class, $actual);
        $this->assertEquals(false, $actual->getData()->success);
    }

    public function test_destroy_cake_type_success()
    {
        $this->cakeTypeRepository->shouldReceive('delete')
            ->with(Mockery::type('string'))
            ->once()
            ->andReturn(true);
        $actual = $this->cakeTypeController->destroy('1');

        $this->assertInstanceOf(JsonResponse::class, $actual);
        $this->assertEquals(true, $actual->getData()->success);
    }

    public function test_destroy_cake_type_fail()
    {
        $this->cakeTypeRepository->shouldReceive('delete')
            ->with(Mockery::type('string'))
            ->once()
            ->andReturn(false);
        $actual = $this->cakeTypeController->destroy('1');

        $this->assertInstanceOf(JsonResponse::class, $actual);
        $this->assertEquals(false, $actual->getData()->success);
    }

    public function test_get_list_cake_type()
    {
        $this->cakeTypeRepository->shouldReceive('getAll')
            ->with(Mockery::type('array'))
            ->once()
            ->andReturn(Mockery::type('array'));
        $actual = $this->cakeTypeController->getListCakeType();
        $this->assertInstanceOf(JsonResponse::class, $actual);
        $this->assertEquals(true, $actual->getData()->success);
    }
}
