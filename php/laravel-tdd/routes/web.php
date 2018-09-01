<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/threads', '\App\Http\Controllers\ThreadController@index');
Route::get('/threads/create', '\App\Http\Controllers\ThreadController@create');
Route::get('/threads/{channel}', '\App\Http\Controllers\ThreadController@index');
Route::get('/threads/{channel}/{thread}', '\App\Http\Controllers\ThreadController@show');
Route::delete('/threads/{channel}/{thread}', '\App\Http\Controllers\ThreadController@destroy');
Route::post('/threads', '\App\Http\Controllers\ThreadController@store');
Route::post('/threads/{channel}/{thread}/replies', '\App\Http\Controllers\ReplyController@store');
Route::delete('/replies/{reply}', '\App\Http\Controllers\ReplyController@destroy');
Route::patch('/replies/{reply}', '\App\Http\Controllers\ReplyController@update');

Route::post('/replies/{reply}/favorites', '\App\Http\Controllers\FavoriteController@store');
Route::delete('/replies/{reply}/favorites', '\App\Http\Controllers\FavoriteController@destroy');

Route::get('/profiles/{user}/', '\App\Http\Controllers\ProfileController@show')->name('profile');


