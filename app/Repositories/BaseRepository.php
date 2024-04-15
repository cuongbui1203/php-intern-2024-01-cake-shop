<?php

namespace App\Repositories;

interface BaseRepository
{
    public function find(string $id);

    public function create(array $attributes);

    public function update(string $id, array $attributes);

    public function delete(string $id);

    public function getAll();
}
