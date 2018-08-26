@component('profiles.activities.activity')
    @slot('heading')
        {{ $profileUser->name}} favorited to
        <a href="{{ $activity->subject->favorited->path()  }}"> a reply</a>
    @endslot
    @slot('body')
        <strong>favorited:</strong>
        {{$activity->subject->favorited->body}}
    @endslot
@endcomponent