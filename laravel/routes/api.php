<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// CORS
Route::group(['middleware' => 'cors'], function() {

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('login', 'LoginController@login');
Route::post('register', 'RegisterController@register');
Route::post('password/reset', 'SendPasswordResetEmailController@sendemail');
Route::post('password/reset/{id}', 'PasswordResetController@reset');

	Route::group(['middleware' => 'auth:api'], function () {
		Route::get('logout', 'LogoutController@logout');
		
        Route::resource('home', 'HomeController');

		Route::resource('about', 'AboutController');

		Route::resource('posts', 'PostController');

		Route::get('settings/edit', 'SettingController@edit');
		Route::patch('settings', 'SettingController@update');
		Route::get('settings', 'SettingController@index');
		Route::delete('settings', 'SettingController@destroy');

		Route::post('search', 'SearchController@search');
    });

});
