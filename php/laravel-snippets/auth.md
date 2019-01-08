
認証をEmailからユーザ名にする

### Controller
```
/app/Http/Controllers/Auth/LoginController.php

class LoginController extends Controller
{
    ...
    public function username()
    {
        return 'name';
    }
    ...
}
```

### view
```
resources/views/auth/login.blade.php
...
<div class="form-group row">
    <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label>

    <div class="col-md-6">
        <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

        @if ($errors->has('name'))
            <span class="invalid-feedback" role="alert">
                <strong>{{ $errors->first('name') }}</strong>
            </span>
        @endif
    </div>
</div>
...
```