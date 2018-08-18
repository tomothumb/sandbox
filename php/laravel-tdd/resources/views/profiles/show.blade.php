@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <p>{{ $profileUser->name}}</p>
                    <p>{{ $profileUser->created_at->diffForHumans() }}</p>
                </div>

                <div class="card">
                    @foreach($threads as $thread)
                        <div>
                            <h4><a href="{{route('profile',$thread->user)}}">{{$thread->user->name}}</a> posted:
                                {{$thread->title}}</h4>

                            <p>Channel: <a href="/threads/{{$thread->channel->name}}">{{$thread->channel->name}}</a></p>
                            <p>{{$thread->created_at->diffForHumans()}}</p>
                            <p>{{$thread->body}}</p>
                        </div>
                        <hr>
                    @endforeach

                </div>

                {{$threads->links()}}

            </div>
        </div>

    </div>
@endsection

