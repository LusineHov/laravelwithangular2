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

        if(!\Auth::attempt($credentials, $request->has('remember'))){
            return response()->json(['message'=>"Username, Password does not match."], 403);
        }
        return response(\Auth::user(),201);
    }
}