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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => '/whois'], function(){
    Route::get('/lookup/{ipv4}', 'Api\WhoisController@lookup');
    Route::get('/forcelookup/{ipv4}', 'Api\WhoisController@forcelookup');
    Route::get('/lookup/{ipv4}/jsonp', 'Api\WhoisController@lookupJsonp');
    Route::get('/forcelookup/{ipv4}/jsonp', 'Api\WhoisController@forcelookupJsonp');
});

//JSONP
Route::get('/jsonp', function(){
    $callback_fn = request()->get('jsonp_callback');
    return response()->jsonp($callback_fn, ['a','b','c']);

    /*
     * # javascript
        callbackfunc = function(json){
            console.log(json);
        };

        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:9090/api/whois/lookup/11.22.33.45?_callback=callbackfunc',
            dataType: 'jsonp'
        });
     */
});
