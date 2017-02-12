<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class LogoutController extends Controller
{
    public function logout() {
        Auth::guard('api')->user()->update(['api_token' => null]);
    }
}