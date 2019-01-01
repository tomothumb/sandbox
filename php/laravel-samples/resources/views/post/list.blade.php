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

@include('includes.nav',['user' => $user])

@if(session()->has('message'))
    Message：{{ session('message') }}
@endif

<div class="flex-center position-ref full-height">
    <div class="content">
        <p><a href="/user/{{$user->id}}/post/new">新規作成</a></p>
        <p>投稿一覧</p>
        <ul>
            @foreach ($posts as $post)
                <li><a href="/user/{{$user->id}}/post/{{$post->id}}">{{$post->subject}}</a></li>
            @endforeach
        </ul>
    </div>
</div>
</body>
</html>
