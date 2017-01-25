<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class UpdatePostRequest extends FormRequest
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
    public function rules(Request $request) 
    {
        //return [];
        return [
            'title' => 'required|unique:posts,title,'.$request->segment(3).'|max:255',
            'content' => 'required',
            'category_id' => 'required',
        ];

    }
}
