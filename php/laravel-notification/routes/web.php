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
    $user1 = \App\User::firstOrNew([
        'name' => 'NAME1',
        'email'=>'example@example.com',
    ]);
    $user1->password = bcrypt('demo');
    $user1->save();

    for ($i = 2; $i < 10; $i++) {
        $tmpuser = \App\User::firstOrNew([
                "name" => "NAME{$i}",
                "email" => "example{$i}@example.com"
            ]);
        $tmpuser->password = bcrypt('demo');
        $tmpuser->save();
    }
    $user = $user1;

    // 既読にする
    // $user->unreadNotifications->markAsRead();
    return view('welcome',compact('user'));
});

Route::get('/crawler/test', 'CrawlerSettingController@getTest');

Route::group(['prefix' => '/user/{user_id}'], function(){
    Route::get('/', function ($user_id) {
        $user = \App\User::find($user_id);
        return view('welcome',compact('user'));
    });

    // 既読状態にする
    Route::get('/notification/read', function ($user_id) {
        $user = \App\User::find($user_id);
        $user->unreadNotifications->markAsRead();
    });

    Route::get('/follow/{target_user_id}', function (int $user_id, int $target_user_id) {
        $main_user = \App\User::find($user_id);
        $target_user = \App\User::find($target_user_id);
        $main_user->follow($target_user);
        return redirect("/user/{$user_id}");
    });

    Route::get('/unfollow/{target_user_id}', function (int $user_id, int $target_user_id) {
        $main_user = \App\User::find($user_id);
        $target_user = \App\User::find($target_user_id);
        $main_user->unfollow($target_user);
        return redirect("/user/{$user_id}");
    });

    // 投稿
    Route::group(['prefix' => '/post'], function() {

        Route::get('/', function (int $user_id) {
            $user = \App\User::find($user_id);
            $posts = \App\Post::where('user_id',$user_id)->get();
            return view('post.list',compact('user','posts'));
        });

        Route::get('/new', function (int $user_id) {
            $user = \App\User::find($user_id);
            return view('post.new',compact('user'));
        });

        Route::post('/new', function (int $user_id, \Illuminate\Http\Request $request) {
            $user = \App\User::find($user_id);
            $post = \App\Post::firstOrCreate([
                'user_id' => $user_id,
                'subject' => $request->subject,
                'body' => $request->body
            ]);
            return redirect("/user/{$user_id}/post/");
        });

        Route::get('/{post_id}', function (int $user_id,int $post_id) {
            $user = \App\User::find($user_id);
            $post = \App\Post::find($post_id);
            $post->loadMissing('post_comments');
            return view('post.detail',compact('user','post'));
        });

        Route::post('/{post_id}/comment', function (int $user_id,int $post_id, \Illuminate\Http\Request $request) {
            $user = \App\User::find($user_id);
            $post = \App\Post::find($post_id);
            $post_comment = \App\PostComment::firstOrCreate([
                'post_id' => $post_id,
                'comment' => $request->comment
            ]);
            $user->notify(new \App\Notifications\CommentNotification($user,$post));


            return redirect("/user/{$user_id}/post/{$post_id}");
        });

    });


});



