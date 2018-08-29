<reply-component :attributes="{{ $reply }}" inline-template>

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


    <div v-if="editing">
        <textarea class="form-control" name="reply_edit" id="" cols="30" rows="5" v-model="body">{{$reply->body}}</textarea>
        <button class="btn btn-primary" @click="update">Update</button>
        <button class="btn btn-link" @click="editing = false">Cancel</button>
    </div>
    <div v-else>
        <p>{{$reply->body}}</p>
    </div>

    <hr>
    @can ('update', $reply)
        <div>
            <button class="btn btn-info" @click="editing = true">Edit</button>
            <form action="/replies/{{$reply->id}}" method="post">
                {{ method_field('DELETE') }}
                <button type="submit" class="btn btn-danger">DELETE</button>
            </form>
        </div>
    @endcan
</div>
<hr>

</reply-component>