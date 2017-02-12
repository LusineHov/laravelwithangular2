<?php
namespace App\Services;

use App\Contracts\PostsServiceInterface;
use App\Post;
use Auth;  

class PostsService implements PostsServiceInterface{

	public function __construct(Post $post)
	{
		$this->post = $post;
	}

	public function getAllPosts()
	{
		$posts = $this->post->all();
		return $posts;
	}

	public function getPostByID($id)
	{
		return $this->post->find($id);
	}

	public function updatePostByID($inputs,$id)
	{
		return $this->post->find($id)->updatePost($inputs);
	}

	public function addPost($inputs)
	{
		$this->post->createPost($inputs);
	}

	public function deletePost($id)
	{
		return $this->post->find($id)->delete();
	}
	
	public function getAllPostsOfUser($user_id)
	{
		return $this->post->where('user_id', $user_id)->get();
	}

	public function deleteAllPostsOfUser($user_id)
	{
    	return  $this->post->where('user_id', $user_id)->delete();
	}
}