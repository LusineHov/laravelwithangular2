<?php
namespace App\Contracts;

interface CategoriesServiceInterface 
{
	/* returns all categories */
	public function getAllCategories();

	/* get name as a parameter*/
	/* returns categories by name */
	public function getCategoryByName($name);
}