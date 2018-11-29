<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Twilio Demo</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">


    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
</head>
<body>

<h1>Twilio</h1>
<p>SEND SMS</p>


<p><a href="/twilio/{{env('TWILIO_DEBUG_PHONE_NUMBER')}}/sendsms">Send SMS Message</a>.</p>

</body>
</html>
