<div>
<p>{{$reply->id}}</p>
<p><a href="{{$reply->user->path()}}">
    {{$reply->user->name}}
    </a> said {{$reply->created_at->diffForHumans()}}...</p>

    <form method="post" action="/replies/{{$reply->id}}/favorites">
        <button type="submit" class="btn btn-primary" {{ $reply->isFavorited() ? 'disabled' : "" }} >
            {{$reply->favoritesCount}} {{ str_plural('Favorite', $reply->favoritesCount) }}
        </button>
    </form>

<p>{{$reply->body}}</p>
</div>
<hr>