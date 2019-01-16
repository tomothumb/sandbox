<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Payment Demo</title>
    <style>
        p{
            display: block;
        }
        label{
            display: block;
        }
    </style>
</head>
<body>


@if(session()->has('message'))
    Message：{{ session('message') }}
@endif

<div class="flex-center position-ref full-height">
    <div class="content">
        <form action="/welcome" method="POST">
            <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                    data-key="pk_test_60sd3w2UujNuq3xnzsR75emP"　<!--ここにAPIキーをコピペ-->
            data-amount="1000"　<!-- 表示する課金額を記入 -->
            data-name="TEST"
            data-description="TESTTEST"
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="ja"<!-- autoでも日本語表示になりましたが、念のためjaに変更 -->
            data-currency="jpy">
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            })
            </script>
            </form>
    </div>
</div>
</body>
</html>

