<?php

namespace App\Repositories\Cake;

use App\Repositories\EloquentBaseRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EloquentCakeRepository extends EloquentBaseRepository implements CakeRepository
{
    public function getModel()
    {
        return \App\Models\Cake::class;
    }

    public function getCakeByType(string $typeId)
    {
        return $this->model->where('type_id', $typeId);
    }

    public function getAllCakesByFilter(array $typeIds, $minPrice, $maxPrice)
    {
        $minPrice = $minPrice ?? 0;
        $maxPrice = $maxPrice ?? PHP_INT_MAX;

        return $this->model->where(function ($query) use ($typeIds) {
            if (count($typeIds) !== 0) {
                $query->whereIn('type_id', $typeIds);
            }

            return $query;
        })->whereBetween('price', [$minPrice, $maxPrice]);
    }

    public function groupCakeByType()
    {
        return $this->model->leftJoin('cake_types', 'type_id', '=', 'cake_types.id')
            ->leftJoin('pictures', 'pictures.cake_id', '=', 'cakes.id')
            ->get([
                'cakes.*',
                DB::raw('cake_types.name as type'),
                DB::raw('pictures.id as img_id'),
            ])
            ->unique('id')
            ->groupBy('type_id');
    }

    public function updateIngredients(string $id, array $ingredients)
    {
        try {
            $this->model->find($id)->ingredients()->sync($ingredients);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateCakeAmount(string $id, int $amount)
    {
        try {
            $cake = $this->model->find($id);
            $cake->update([
                'amount' => $cake->amount + $amount,
            ]);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function destroy(string $id)
    {
        $cake = $this->model->find($id);
        $pictures = $cake->pictures;
        foreach ($pictures as $picture) {
            try {
                Storage::get($picture->link);
                Storage::delete($picture->link);
            } catch (Exception $e) {
                return false;
            }

            DB::table('pictures')->where('id', '=', $picture->id)->delete();
        }

        $cake->delete();

        return true;
    }
}
