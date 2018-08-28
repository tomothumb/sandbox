<div id="reply-{{$reply->id}}">
<p>{{$reply->id}}</p>
<p><a href="{{route('profile',$reply->user)}}">
    {{$reply->user->name}}
    </a> said {{$reply->created_at->diffForHumans()}}...</p>

    <form method="post" action="/replies/{{$reply->id}}/favorites">
        <button type="submit" class="btn btn-primary" {{ $reply->isFavorited() ? 'disabled' : "" }} >
            {{$reply->favorites->count()}} {{ str_plural('Favorite', $reply->favorites->count()) }}
        </button>
    </form>

<p>{{$reply->body}}</p>

    <hr>
    @can ('update', $reply)
        <div>
            <form action="/replies/{{$reply->id}}" method="post">
                {{ method_field('DELETE') }}
                <button type="submit" class="btn btn-danger">DELETE</button>
            </form>
        </div>
    @endcan
</div>
<hr>