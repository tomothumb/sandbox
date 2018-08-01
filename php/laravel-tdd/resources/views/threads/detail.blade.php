@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <a href="{{$thread->user->path()}}">{{$thread->user->name}}</a>
                        posted {{$thread->created_at->diffForHumans()}}<br>
                        {{$thread->title}}</div>


                    <div class="card-body">
                        {{$thread->body}}
                    </div>
                    <hr>

                    <div class="card-body">
                        <h3>Reply</h3>
                        @foreach( $thread->replies as $reply)
                            @include( 'threads.reply')
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

