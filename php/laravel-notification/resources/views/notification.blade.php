<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Notification Demo</title>
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            margin: 0;
            padding: 20px;
        }
    </style>

    <script src="/js/app.js"></script>


    <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase.js"></script>
    <script>
        // Initialize Firebase
        var config = {
            apiKey: '{{ env('FIREBASE_apiKey') }}',
            authDomain: '{{ env('FIREBASE_authDomain') }}',
            databaseURL: '{{ env('FIREBASE_databaseURL') }}',
            projectId: '{{ env('FIREBASE_projectId') }}',
            storageBucket: '{{ env('FIREBASE_storageBucket') }}',
            messagingSenderId: '{{ env('FIREBASE_messagingSenderId') }}'
        };
        firebase.initializeApp(config);

        var messaging = firebase.messaging();
        messaging.requestPermission()
            .then(function () {
                console.log('request permission');
                return messaging.getToken();
            }).then(function (token) {
            console.log(token);

        }).catch(function (error) {
            console.log(error);
        });

        messaging.onMessage(function (payload) {
            console.log("onMessage", payload)
        })

    </script>
</head>
<body>

@link https://qiita.com/kite_999/items/e53b1c60a10275988604

<h1>Web Push Test</h1>
<p><a href="#" id="push_regist" class="none">通知登録して！</a></p>
<p><a href="#" id="push_delete" class="none">通知登録消して！</a></p>
<p><button id="sendbtn">直接送信</button></p>
<p><button id="sendbtn_server">サーバから送信</button></p>

<style>
    .none {
        display: none;
    }
</style>

<script>

    var key = '{{ env('FIREBASE_Server_key') }}';
    var to = '{{ env('FCM_TOKEN') }}';
    var notification = {
        'title': 'Portugal vs. Denmark',
        'body': '5 to 1',
        'icon': 'firebase-logo.png',
        'click_action': '{{env("APP_URL")}}/notification'
    };


    function sendMessage() {
        fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'key=' + key,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'notification': notification,

                'to': to
            })
        }).then(function(response) {
            // console.log(response);
        }).catch(function(error) {
            console.error(error);
        })
    }
    document.getElementById('sendbtn').addEventListener('click',function(event){
        sendMessage();
    });
    function sendMessageServer() {
        console.log(document.querySelector('meta[name="csrf-token"]').content);
        fetch('/notification/send', {
            'method': 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        }).then(function(response) {
            console.log("success",response);
        }).catch(function(error) {
            console.error("error",error);
        })
    }
    document.getElementById('sendbtn_server').addEventListener('click',function(event){
        sendMessageServer();
    });


</script>

</body>
</html>
