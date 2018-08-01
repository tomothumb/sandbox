@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{$thread->id}}/
                        {{$thread->title}}</div>

                    <div class="card-body">
                        {{$thread->body}}
                    </div>
                    <hr>

                    <div class="card-body">
                        <h3>Reply</h3>
                        @foreach( $thread->replies as $reply)
                            <p>ID:{{$reply->id}}</p>
                            <p><a href="/user/{{$reply->user->path()}}">
                                {{$reply->user->name}}
                                </a> said {{$reply->created_at->diffForHumans()}}...</p>
                            <p>Body:{{$reply->body}}</p>
                            <hr>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

