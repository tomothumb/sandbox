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
        <p><a href="javascript:history.back()">戻る</a></p>
        <hr>
        <p><strong>タイトル：</strong><br>
            {{$post->subject}}</p>

        <p><strong>本文：</strong><br>
            {{$post->body}}</p>
        <hr>

        <h3>コメント</h3>
        <ul>
            @foreach ($post->post_comments as $post_comment)
                <li><em style="color: #999999; font-size: 13px;">{{$post_comment->created_at}}</em>：{{$post_comment->comment}}</li>
            @endforeach
        </ul>
        <hr>
        <div>
            <h3>コメントする</h3>
            <form method="POST" action="/user/{{$user->id}}/post/{{$post->id}}/comment">
                {{ csrf_field() }}
                <p>本文<br>
                    <textarea name="comment" id="" cols="30" rows="10"></textarea></p>
                <p><input type="submit" value="送信"></p>
            </form>
        </div>

    </div>
</div>
</body>
</html>
