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
                                <form method="POST" action="/thread">
                                    <textarea name="body" id="body" rows="5" style="width: 100%;" placeholder="Have something to say?"></textarea>
                                    <p><input type="submit" value="POST"></p>
                                </form>
                            </div>
                        </div>
                    @else
                        <p class="text-center">Please <a href="{{ route('login') }}">sign in</a> to participate in this discussion.</p>
                    @endif

                </div>

                <div class="card">
                    <div class="card-header">Forum Threads</div>

                    <div class="card-body">
                        @foreach($threads as $thread)
                            <article>
                                <h4>
                                    <a href="{{$thread->path()}}">
                                        {{$thread->id}}/
                                        {{$thread->title}}

                                    </a>
                                </h4>
                                <div class="body">{{$thread->body}}</div>

                            </article>

                            <hr>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

