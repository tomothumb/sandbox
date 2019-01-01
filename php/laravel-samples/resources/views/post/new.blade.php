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
        <p>新規作成</p>
        <form method="POST" action="/user/{{$user->id}}/post/new">
            {{ csrf_field() }}
            <p>タイトル<br>
                <input type="text" name="subject"></p>
            <p>本文<br>
                <textarea name="body" id="" cols="30" rows="10"></textarea></p>
            <p><input type="submit" value="送信"></p>
        </form>
    </div>
</div>
</body>
</html>
