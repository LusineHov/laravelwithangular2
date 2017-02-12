<?php
namespace App\Contracts;

interface PostsServiceInterface 
{
	/* returns all posts */
	public function getAllPosts();

	/* get ID as a parameter*/
	/* returns posts by ID */
	public function getPostByID($id);

	/* get inputs and ID as parameters*/
	/* update posts*/
	public function updatePostByID($inputs,$id);

	/* get inputs as a parameter*/
	/* add posts*/
	public function addPost($inputs);

	/* get ID as a parameter*/
	/* delete post*/
	public function deletePost($id);

	/* get user_id as a parameter*/
	/* return user's posts*/
	public function getAllPostsOfUser($user_id);

	/* get user_id as a parameter*/
	/* delete user's posts*/
	public function deleteAllPostsOfUser($user_id);
} 