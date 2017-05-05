<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\UsersServiceInterface;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Redis;
use Session;
use LRedis;
use Auth;

class UserController extends Controller{
    public function __construct()
    {
    	//
    }

    public function getusers(UsersServiceInterface $usersService)
    {
    	$users = $usersService->getAllUsers();
        return response()->json(compact('users'),200);
    }
}