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
                </div>

                @if(auth()->check())
                <div class="card">
                    <div class="card-header">
                        <h3>Comment</h3>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="{{$thread->path() .'/replies' }}">
                            <textarea name="body" id="body" rows="5" style="width: 100%;" placeholder="Have something to say?"></textarea>
                            <p><input type="submit" value="POST"></p>
                        </form>
                    </div>
                </div>
                    @else
                    <p class="text-center">Please <a href="{{ route('login') }}">sign in</a> to participate in this discussion.</p>
                @endif

                <div class="card">
                    <div class="card-header">
                    <h3>Replies</h3>
                    </div>
                    <div class="card-body">
                    @foreach( $replies as $reply)
                        @include( 'threads.reply')
                    @endforeach
                        {{$replies->links()}}
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">Thread Information</div>
                    <div class="card-body">
                        <p>This thread was published {{ $thread->created_at->diffForHumans() }} by
                            <a href="#">{{ $thread->user->name }}</a>, and currentry has
                            {{ $thread->replies_count }} {{ str_plural('comment', $thread->replies_count) }}.</p>
                    </div>
                </div>
            </div>
        </div>



    </div>
@endsection

