<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cake extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'description',
        'type_id',
        'price',
        'amount',
        'cook_time',
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(CakeType::class, 'type_id');
    }

    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class);
    }

    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class);
    }

    public function avatar()
    {
        return $this->pictures->first();
    }

    protected $cast = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
    ];
}
