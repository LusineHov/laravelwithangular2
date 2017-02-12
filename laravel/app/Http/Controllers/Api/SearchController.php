<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use DB; 

class SearchController extends Controller
{
    public function search()
	{
		$search = \Request::get('term');
	  	$posts = \DB::table('posts')->where('title', 'LIKE', '%' . $search . '%')->get();
	        
	    return response()->json(compact('posts'),200);
	}
}