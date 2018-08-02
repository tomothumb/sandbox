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

Route::get('/threads', '\App\Http\Controllers\ThreadController@index');
Route::get('/threads/{thread}', '\App\Http\Controllers\ThreadController@show');
Route::post('/threads/{thread}/replies', '\App\Http\Controllers\ReplyController@store');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
