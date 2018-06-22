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
            padding:20px;
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
    </script>
</head>
<body>

@link https://qiita.com/kite_999/items/e53b1c60a10275988604

<h1>Web Push Test</h1>
<p><a href="#" id="push_regist" class="none">通知登録して！</a></p>
<p><a href="#" id="push_delete" class="none">通知登録消して！</a></p>

<style>
    .none{
        display: none;
    }
</style>

<script>
    function initialiseState() {
        if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
            console.warn("プッシュ通知が対応されておりません");
            return;
        }

        if (Notification.permission === "denied") {
            console.warn("通知をブロックしております");
            return;
        }

        if (!("PushManager" in window)) {
            console.warn("プッシュ通知が対応されておりません");
            return;
        }

        //既に過去に登録されている場合は登録するボタンではなく、削除ボタンを表示します
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription().then(
                function (subscription) {
                    console.log(subscription);
                    document.getElementById("#push_regist").classList.add('none');
                    document.getElementById("#push_delete").classList.add('none');

                    if (!subscription) {
                        document.getElementById("#push_regist").classList.remove('none');
                        return;
                    }
                    document.getElementById("#push_delete").classList.remove('none')
                }).catch(function(err){
                console.warn("Error during getSubscription()", err);
            });
        });
    }

    function isLocalhost(){
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        {
            return true;
        }
        return false;


    }

    if ("serviceWorker" in navigator &&
        (window.location.protocol === "https:" || isLocalhost)) {
        navigator.serviceWorker.register("./sw.js").then(
            function (registration) {
                if (typeof registration.update == "function") {
                    registration.update();
                }

                initialiseState();
            }).catch(function (error) {
            console.error("Service Worker registration failed: ", error);
        });
    }

    //サブスクリプションを発行します
    document.getElementById("#push_regist").addEventListener("click", function(){
        Notification.requestPermission(function(permission) {
            if(permission !== "denied") {
                subscribe();
            } else {
                alert ("プッシュ通知を有効にできません。ブラウザの設定を確認して下さい。");
            }
        });
    });

    //サブスクリプションをサーバ、ブラウザ共に削除します
    document.getElementById("#push_delete").addEventListener("click", function(){
        unsubscribled();
    });

    function subscribe() {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true }).then(
                function(subscription) {
                    document.getElementById("#push_regist").classList.add('none');
                    document.getElementById("#push_delete").classList.remove('none');

                    return sendSubscriptionToServer(subscription);
                }
            ).catch(function (e) {
                if (Notification.permission == "denied") {
                    console.warn("Permission for Notifications was denied");
                } else {
                    console.error("Unable to subscribe to push.", e);
                    window.alert(e);
                }
            })
        });
    }

    function unsubscribled() {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription().then(
                function(subscription) {
                    if (!subscription ) {
                        document.getElementById("#push_regist").classList.remove('none');
                        document.getElementById("#push_delete").classList.add('none');

                        return;
                    }

                    sendSubscriptionToServerForDelete(subscription);

                    subscription.unsubscribe().then(function(successful) {
                        document.getElementById("#push_regist").classList.remove('none');
                        document.getElementById("#push_delete").classList.add('none');

                    }).catch(function(e) {
                        console.error("Unsubscription error: ", e);
                        document.getElementById("#push_regist").classList.remove('none');
                        document.getElementById("#push_delete").classList.add('none');

                    });
                }
            ).catch(
                function(e) {
                    console.error("Error thrown while unsubscribing from push messaging.", e);
                }
            )
        });
    }

    function sendSubscriptionToServer(subscription) {
        //発行したサブスクリプションをサーバー側に送信します。
        //ここではサブスクリプションを/recieve.phpに送信しています。
        console.log('sending to server for regist:',subscription);
        var data = {"subscription" : subscription.endpoint};
        $.ajax({
            type: "POST",
            url: "/recieve.php",
            dataType: "json",
            cache: false,
            data: data
        });
    }

    function sendSubscriptionToServerForDelete(subscrption) {
        //TODO サブスクリプションをサーバーから削除する処理。テストなので実装していません。
        console.log('sending to server for delete:', subscrption);
    }

</script>

</body>
</html>
