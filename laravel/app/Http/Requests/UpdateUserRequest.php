<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Auth;

class UpdateUserRequest extends FormRequest
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
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.Auth::user()->id,
            'password' => 'required|min:6|confirmed'
        ];
       
        // elseif(Request::is('settings/email*')){

        //     return [
        //             'email' => 'required|email|max:255|unique:users,email,'.Auth::user()->id,
        //         ];
        // }
        // elseif(Request::is('settings/password*')){

        //     return [
        //             'password' => 'required|min:6|confirmed',
        //         ];
        // }
        
        
    }
}
