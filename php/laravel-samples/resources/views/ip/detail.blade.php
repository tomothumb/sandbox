<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ip Demo</title>
</head>
<body>

@if(session()->has('message'))
    Message：{{ session('message') }}
@endif

<div class="flex-center position-ref full-height">
    <div class="content">
        <p><a href="javascript:history.back()">戻る</a></p>
        <hr>
        <div>
            <form method="POST" action="/ip/{{$ip->id}}/edit">
                {{ csrf_field() }}
                <p>編集できません</p>
                <p><input type="submit" value="送信"></p>
            </form>
        </div>

    </div>
</div>
</body>
</html>
