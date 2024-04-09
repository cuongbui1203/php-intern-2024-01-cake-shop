<?php

namespace App\Rules;

use App\Models\CakeType;
use Illuminate\Contracts\Validation\Rule;

class CheckCakeTypeRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        $data = json_decode($value);
        $allCakeTypes = CakeType::all(['id'])->pluck('id')->toArray();

        return count(array_diff($data, $allCakeTypes)) === 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('validation.custom.CakeType.Invalid');
    }
}
