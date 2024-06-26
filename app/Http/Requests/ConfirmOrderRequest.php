<?php

namespace App\Http\Requests;

use App\Rules\DetailOrderRule;
use Illuminate\Foundation\Http\FormRequest;

class ConfirmOrderRequest extends FormRequest
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
            'shipping_address' => 'required|string',
            'shipping_phone' => 'required',
            'details' => [
                'json',
                new DetailOrderRule(),
            ],
            'note' => 'string|nullable',
        ];
    }
}
