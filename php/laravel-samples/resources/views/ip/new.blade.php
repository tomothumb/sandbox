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


        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="/ip/new">
            {{ csrf_field() }}
            <p>IP <br>
                <input type="text" name="ip_address" placeholder="xxx.xxx.xxx.xxx"></p>
            <p><input type="submit" value="送信"></p>
        </form>

    </div>
</div>
</body>
</html>
