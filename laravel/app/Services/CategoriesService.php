<?php
namespace App\Services;

use App\Contracts\CategoriesServiceInterface;
use App\Category;

class CategoriesService implements CategoriesServiceInterface
{
	public function __construct(Category $category)
	{
		$this->category = $category;
	}

	public function getAllCategories()
	{
		
		$categories = $this->category->all();
		return $categories;

	}

	public function getCategoryByName($name)
	{
		return $this->category->where('name', $name)->first();
	}
}