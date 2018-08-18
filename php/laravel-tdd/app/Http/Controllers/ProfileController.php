<?php

namespace App\Http\Controllers;

use App\Model\Thread;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function show(\App\User $user)
    {
        return view('profiles.show',[
            'profileUser' => $user,
            'threads' => $user->threads()->paginate(10)
        ]);
    }
}
