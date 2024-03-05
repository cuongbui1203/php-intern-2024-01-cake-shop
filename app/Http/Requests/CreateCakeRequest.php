<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCakeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|min:0|numeric',
            'cookTime' => 'required|min:0|numeric|max:200',
            'idCakeType' => 'required|exists:cake_types,id',
        ];
    }
}
