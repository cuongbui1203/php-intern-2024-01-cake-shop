<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewCakeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->cakes->contains($this->cake->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rating' => 'required|min:0.5|max:5|numeric',
            'comment' => 'nullable|string|max:255',
        ];
    }
}
