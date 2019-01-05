<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ip Demo</title>
    <style>
        body{
            padding: 10px;
        }
        table{
            border-collapse: collapse;
        }
        thead{
            background: #FAFAFA;
        }
        tr{}
        td,
        th{
            font-size: 12px;
            border: 1px solid #CCCCCC;
            padding:2px 10px;
        }
    </style>
</head>
<body>

@if(session()->has('message'))
    Message：{{ session('message') }}
@endif

<div class="flex-center position-ref full-height">
    <div class="content">
        <p><a href="/ip/new">新規作成</a></p>

        <p>IP&組織 マスタ</p>
        <table>
            <thead>
            <tr>
                <td>組織</td>
                <td>ドメイン</td>
                <td>IP - Start</td>
                <td>IP - End</td>
                <td>&nbsp;</td>
            </tr>
            </thead>
            @foreach ($ips as $ip)
                <tr>
                    <td>{{$ip->org}}</td>
                    <td>{{$ip->domain}}</td>
                    <td>{{$ip->ip_from}}</td>
                    <td>{{$ip->ip_to}}</td>
                    <td>
                        <a href="/ip/{{$ip->id}}">詳細</a>
                        <a href="/ip/{{$ip->id}}/delete">削除</a>
                    </td>
                </tr>
            @endforeach
        </table>
        <hr>
        {{ $ips->links() }}

    </div>
</div>
</body>
</html>
