<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\StorePostRequest;
use App\Contracts\PostsServiceInterface;
use App\Contracts\CategoriesServiceInterface;  
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Redis;
use Session;
use LRedis;
use Auth;

class CardController extends Controller{
    public function __construct()
    {
    	//
    }

    public function store(StorePostRequest $request, PostsServiceInterface $postsService, CategoriesServiceInterface $categoriesService, Guard $auth)
    {
    	// $redis = Redis::connection();
        $inputs = $request->all();
        $category = $categoriesService->getCategoryByName($inputs['category_id']);
        $category_id = $category->id;
        // $inputs['user_id'] = 1;
        $inputs['category_id'] = $category_id;
        $createpost = $postsService->addPost($inputs);
        // $redis->set('tutorials', json_encode($inputs));
        $post = $postsService->getLastPost();
        return response()->json(compact('post'),200);
    }
}