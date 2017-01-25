<?php
namespace App\Services;

use App\Contracts\UsersServiceInterface;
use App\User; 

class UsersService implements UsersServiceInterface {
	
	public function __construct(User $user)
	{
		$this->user = $user;
	}

	public function updateUser($inputs, $id)
	{
    	return $this->user->find($id)->updateUser($inputs);
	}

	public function deleteUser($id)
	{
		return $this->user->find($id)->delete();
	}
}