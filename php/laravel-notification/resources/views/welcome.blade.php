<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Notification Demo</title>
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            margin: 0;
            padding:20px;
        }
    </style>
</head>
<body>

@if(session()->has('message'))
    Message：{{ session('message') }}
@endif

<h1>NOTIFICATION DEMO</h1>
<div class="flex-center position-ref full-height">
    @if (Route::has('login'))
        <div class="top-right links">
            @auth
                <a href="{{ url('/home') }}">Home</a>
            @else
                <a href="{{ route('login') }}">Login</a>
                <a href="{{ route('register') }}">Register</a>
            @endauth
        </div>
    @endif

    <div class="content">

        @if($user->notifications->count() >= 1 )
        <h3>YOUR NOTIFICATION</h3>
        <ul>
            @foreach ($user->unreadNotifications as $notification)
                <li>{{$notification->data['message']}}</li>
            @endforeach
        </ul>
        @endif

        <h3>FOLLOWING User List</h3>
        <ul>
            @foreach($user->user_followings as $following_user)
                <li>{{$following_user->name}}：<a href="/user/{{$user->id}}/unfollow/{{$following_user->id}}">[Remove]</a></li>
            @endforeach
        </ul>
        <h3>User List</h3>
        <ul>
            @foreach(\App\User::all() as $eachuser)
                @if($eachuser->id == $user->id) @continue @endif
                <li><p>{{$eachuser->id}} : {{$eachuser->name}}：
                        <a href="/user/{{$user->id}}/follow/{{$eachuser->id}}">[Follow]</a>
                    </p>
                </li>
            @endforeach
        </ul>
    </div>
</div>
</body>
</html>
