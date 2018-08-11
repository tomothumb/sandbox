@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    @if(auth()->check())
                        <div class="card">
                            <div class="card-header">
                                <h3>Create new thread.</h3>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="/threads">
                                    @if(count($errors))
                                        <ul class="alert alert-danger">
                                            @foreach($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    @endif

                                    <p>Title:<br>
                                        <input type="text" name="title" value="{{old('title')}}" required></p>
                                    <p>Choose a Cannel<br>
                                        <select name="channel_id" id="channel_id" required>
                                            <option value="">-- Choose one --</option>
                                            @foreach($channels as $channel)
                                                <option value="{{ $channel->id }}"
                                                {{(old('channel_id') == $channel->id) ? 'selected':""}}
                                                >{{ $channel->name }}</option>
                                            @endforeach
                                        </select>

                                    </p>

                                    <p>
                                        Body:
                                        <textarea name="body" id="body" rows="5" style="width: 100%;" placeholder="Have something to say?" required>{{old('body')}}</textarea>
                                    </p>

                                    <p><button type="submit" class="btn btn-primary">PUBLISH</button></p>

                                </form>


                            </div>
                        </div>
                    @else
                        <p class="text-center">Please <a href="{{ route('login') }}">sign in</a> to participate in this discussion.</p>
                    @endif

                </div>

            </div>
        </div>

    </div>
@endsection

