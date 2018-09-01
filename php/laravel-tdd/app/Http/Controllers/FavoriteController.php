<?php

namespace App\Http\Controllers;

use App\Model\Reply;

class FavoriteController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->only('store');
    }

    public function store(Reply $reply)
    {
        $reply->favorite(auth()->id());
        return redirect()->back();
    }

    public function destroy(Reply $reply)
    {
        $reply->unfavorite(auth()->id());
        if(request()->wantsJson()){
            return response([],204);
        }
        return redirect()->back();
    }
}
