<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CakeType extends Model
{
    use HasFactory;

    public $timestamp = false;

    protected $fillable = [
        'name',
        'description',
    ];

    public function cakes(): HasMany
    {
        return $this->hasMany(Cake::class, 'type_id');
    }
}
