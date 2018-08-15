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
}
