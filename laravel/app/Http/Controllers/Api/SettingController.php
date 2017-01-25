<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use App\Http\Requests\UpdateUserRequest;
use App\Contracts\PostsServiceInterface;
use App\Contracts\UsersServiceInterface;
use Illuminate\Contracts\Auth\Guard;
use File; 
use Hash; 

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UsersServiceInterface $usersService, Guard $auth)
    {
        $user = $auth->user();
        return response()->json(compact('user'),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Guard $auth)
    {
        return response()->json(['message' => 'Success!'],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, UsersServiceInterface $usersService, Guard $auth)
    {
        $inputs = $request->all();
        if(isset($inputs['password'])){
            if (Hash::check($inputs['old_password'], $auth->user()->password)) {    
                if(Hash::check($inputs['password'], $auth->user()->password)){
                    return response()->json(['message' => 'This is your old password, Enter another password.']);
                }
                $inputs['password'] =bcrypt($inputs['password']);
            }
            else{
                return response()->json(['message' => 'Your old password is incorrect.']);
            }
        }
        $user_id = $auth->user()->id;
        $updateuser = $usersService->updateUser($inputs,$user_id);
        // $user = Auth::user();
        // $user->updateUser($inputs);
        return response()->json(compact('updateuser'),201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(UsersServiceInterface $usersService, PostsServiceInterface $postsService, Guard $auth)
    {
        $user = $auth->user();
        $user_id = $auth->user()->id;
        $getuserposts = $postsService->getAllPostsOfUser($user_id);
        $posts = $getuserposts;
        $deleteuserposts = $postsService->deleteAllPostsOfUser($user_id);
        //$user->posts()->delete();
        foreach($posts as $post){
            File::delete('assets/images/'.$post->image);
        }
        //$user->delete();
        //Auth::logout();
        if ($usersService->deleteUser($user_id)){
            return response()->json(['message' => 'Your account has been deleted!'],200);
        }
    }
}
