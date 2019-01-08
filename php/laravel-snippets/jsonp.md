
JSONPレスポンスのサンプル

### Route
```
//JSONP
Route::get('/jsonp_demo', function(){
    $callback_fn = request()->get('_callback');
    return response()->jsonp($callback_fn, ['a','b','c']);

});

```

### view
```
resources/views/auth/login.blade.php
...
<script>
    callbackfunc = function(json){
        console.log(json);
    };

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:9090/api/jsonp_demo?_callback=callbackfunc',
        dataType: 'jsonp'
    });
     
     </script>
...
```