<div>
<p>{{$reply->id}}</p>
<p><a href="{{$reply->user->path()}}">
    {{$reply->user->name}}
    </a> said {{$reply->created_at->diffForHumans()}}...</p>
<p>{{$reply->body}}</p>
</div>
<hr>