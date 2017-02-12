<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class RegisterController extends Controller
{
    public function register(Request $request) {
        $this->validate($request, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);

        $request->merge(['password' => bcrypt($request->password)]);
        $user = User::create($request->all());

        return response($user,201);
    }
}