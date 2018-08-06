@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    @if(auth()->check())
                        <div class="card">
                            <div class="card-header">
                                <h3>Create new thread.</h3>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="/threads">
                                    <p>Title:
                                        <input type="text" name="title"></p>
                                    <p>
                                        Body:
                                        <textarea name="body" id="body" rows="5" style="width: 100%;" placeholder="Have something to say?"></textarea>
                                    </p>
                                    <p><input type="submit" value="PUBLISH"></p>
                                </form>
                            </div>
                        </div>
                    @else
                        <p class="text-center">Please <a href="{{ route('login') }}">sign in</a> to participate in this discussion.</p>
                    @endif

                </div>

            </div>
        </div>

    </div>
@endsection

