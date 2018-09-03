<reply-component :attributes="{{ $reply }}" inline-template>

    <div id="reply-{{$reply->id}}">
        <p>{{$reply->id}}</p>
        <p><a href="{{route('profile',$reply->user)}}">
                {{$reply->user->name}}
            </a> said {{$reply->created_at->diffForHumans()}}...</p>

        @if( Auth::check())
        <div>
            <favorite-component :reply="{{ $reply }}"></favorite-component>
        </div>
        @endif

        <div v-if="editing">
            <textarea class="form-control" name="reply_edit" id="" cols="30" rows="5" v-model="body">{{$reply->body}}</textarea>
            <button class="btn btn-primary" @click="update">Update</button>
            <button class="btn btn-link" @click="editing = false">Cancel</button>
        </div>
        <div v-else v-text="body">

        </div>

        @can ('update', $reply)
            <div>
                <button class="btn btn-info" @click="editing = true">Edit</button>
                <button class="btn btn-danger" @click="destroy">Delete</button>
            </div>
        @endcan
        <hr>

    </div>

</reply-component>
