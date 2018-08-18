@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div>Forum Threads</div>

                @foreach($threads as $thread)

                    <div class="card">

                        <div class="card-body">
                            <h4>
                                <a href="{{$thread->path()}}">
                                    {{$thread->id}}/
                                    {{$thread->title}}
                                </a>
                            </h4>
                            <a href="{{$thread->path()}}" class="meta">
                                {{$thread->replies_count}} {{ str_plural('reply', $thread->replies_count) }}
                            </a>
                            <div class="body">{{$thread->body}}</div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

