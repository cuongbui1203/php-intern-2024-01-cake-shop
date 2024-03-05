<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'cake_id',
        'amount',
        'note',
    ];

    public function cake(): BelongsTo
    {
        return $this->belongsTo(Cake::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    protected $cast = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
    ];
}
