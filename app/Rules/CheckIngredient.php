<?php

namespace App\Rules;

use App\Models\Ingredient;
use Illuminate\Contracts\Validation\Rule;

class CheckIngredient implements Rule
{
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
        $ingredients = json_decode($value);
        $all = Ingredient::all(['id'])->pluck('id');
        $res = count(array_diff($ingredients, $all->toArray()));

        return $res === 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('validation.custom.IngredientError');
    }
}
