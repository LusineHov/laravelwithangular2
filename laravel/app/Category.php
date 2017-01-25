<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];
    public function createCategories ($inputs) {
    	return $this->create($inputs);
    }
    public function posts()
    {
        return $this->hasMany('App\Post');
    }
}
