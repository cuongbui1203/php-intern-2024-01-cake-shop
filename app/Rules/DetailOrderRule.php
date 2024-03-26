<?php

namespace App\Rules;

use App\Models\Cake;
use App\Models\OrderDetail;
use Illuminate\Contracts\Validation\Rule;

class DetailOrderRule implements Rule
{
    private $errorCode;
    private $errors;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->errorCode = 0;
        $this->errors = [];
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $data = (array) json_decode($value);
        $orderDetails = OrderDetail::all(['id', 'amount', 'cake_id']);
        $ids = $orderDetails->pluck('id')->toArray();
        foreach ($data as $id => $amount) {
            $detail = $orderDetails->where('id', $id)->first();
            $cakeName = Cake::where('id', $detail->cake_id)->first('name')->name;
            if ($amount <= 0 || $detail->amount < $amount) {
                array_push(
                    $this->errors,
                    __('validation.custom.outOfRange', [
                        'amount' => __('validation.attributes.amount'),
                        'name' => $cakeName,
                    ])
                );
                $this->errorCode = 1;
            }
        }

        return (count(array_diff(array_keys($data), $ids)) === 0) && $this->errorCode === 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        if (count($this->errors) !== 0) {
            return $this->errors;
        }

        return 'The :attribute invalid.';
    }
}
