<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Static page</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">


    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
</head>
<body>

<h1>Static page</h1>

<h2>MENU</h2>

{{$menu}}
<hr>
{{$menu2}}
<hr>
{{$menu3}}
<hr>
{{$menu4}}
</body>
</html>
