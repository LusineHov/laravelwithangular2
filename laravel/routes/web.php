<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Auth::routes();

Route::resource('home', 'HomeController');

Route::resource('about', 'AboutController');

Route::resource('posts', 'PostController');

Route::get('settings/edit', 'SettingController@edit');
Route::patch('settings', 'SettingController@update');
Route::get('settings', 'SettingController@index');
Route::delete('settings', 'SettingController@destroy');
