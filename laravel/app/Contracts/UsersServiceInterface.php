<?php
namespace App\Contracts;

interface UsersServiceInterface 
{
	/* get inputs and ID as parameters*/
	/* update user*/
	public function updateUser($inputs,$id);

	/* get ID as a parameter*/
	/* delete user*/
	public function deleteUser($id);
} 