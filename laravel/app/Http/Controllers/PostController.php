<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\StorePostRequest;
use App\Contracts\PostsServiceInterface;
use App\Contracts\CategoriesServiceInterface;  
use Illuminate\Contracts\Auth\Guard;
use Session;
use File;
use Image; 

class PostController extends Controller{
    public function __construct()
    {
       $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PostsServiceInterface $postsService)
    {
        $posts = $postsService->getAllPosts();
        //$posts = Post::all();
        //return response()->json(compact('posts'));
        return view('posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CategoriesServiceInterface $categoriesService)
    {
        $categories = $categoriesService->getAllCategories();
        return view('posts.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request, PostsServiceInterface $postsService, CategoriesServiceInterface $categoriesService, Guard $auth)
    {
        $inputs = $request->all();
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imagename = time() . str_random(5).'.'.$image->getClientOriginalExtension();
            $image->storePubliclyAs('assets/images', $imagename, 'public');
            $inputs['image']=$imagename;
        }
        $category = $categoriesService->getCategoryByName($inputs['category_id']);
        $category_id = $category->id;
        //$category_id = DB::table('categories')->where('name', $inputs['category_id'])->first()->id;
        $inputs['user_id'] = $auth->user()->id;
        $inputs['category_id'] = $category_id;
        $createpost = $postsService->addPost($inputs);
        //$post->createPost($inputs);
        //$post=new Post($request->all());
        //Auth::user()->posts()->save($post);
        return redirect('/posts');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(PostsServiceInterface $postsService, $postId)
    {
        $post = $postsService->getPostByID($postId);
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(PostsServiceInterface $postsService, CategoriesServiceInterface $categoriesService, Guard $auth, $postId)
    {
        $post = $postsService->getPostByID($postId);
        $categories = $categoriesService->getAllCategories();
        if($auth->user()->id !== $post->user_id) {
            Session::flash('message', 'You Don`t Have Permission!'); 
            return redirect('/posts/'.$post->id);
        } else {
            //$categories = Category::all();
            return view('posts.edit', ['post' => $post,'categories' => $categories]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, PostsServiceInterface $postsService, CategoriesServiceInterface $categoriesService, $postId)
    {
        $post = $postsService->getPostByID($postId);
        $inputs = $request->all();
        // if($inputs['delete_image']){
        //     \File::delete('assets/images/'.$post->image);
        // }
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imagename = time() . str_random(5).'.'.$image->getClientOriginalExtension();
            $image->storePubliclyAs('assets/images', $imagename, 'public');
            $inputs['image']=$imagename;
            File::delete('assets/images/'.$post->image);
        }
        if($inputs['hidden_image']==""){
            File::delete('assets/images/'.$post->image);
            $inputs['image']=NULL;
        }
        $category = $categoriesService->getCategoryByName($inputs['category_id']);
        $category_id = $category->id;
        //$category_id = DB::table('categories')->where('name', $inputs['category_id'])->first()->id;
        $inputs['category_id'] = $category_id;
        $updatepost = $postsService->updatePostByID($inputs,$postId);
        //$posts->updatePost($inputs);
        return redirect('/posts/'.$post->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
