<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Picture extends Model
{
    use HasFactory;


    protected $fillable = [
        'cake_id',
        'link',
    ];

    public function cake(): BelongsTo
    {
        return $this->belongsTo(Cake::class);
    }
}
