<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class LoginController extends Controller
{
    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);
        $credentials = ['email' => $request->input('email'), 'password' => $request->input('password')];

        if(!\Auth::guard('web')->attempt($credentials, $request->has('remember'))){
            return response()->json(['message'=>"Username, Password does not match."], 403);
        }
        Auth::guard('web')->user()->update(['api_token' => str_random(60)]);
        return response(\Auth::guard('web')->user(),201);
    }
}