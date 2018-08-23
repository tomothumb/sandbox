<?php

namespace App\Http\Controllers;

use App\Model\Activity;
use App\Model\Thread;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function show(\App\User $user)
    {
//        $activities = $this->getActivities($user);
//        return $activities;
        return view('profiles.show',[
            'profileUser' => $user,
            'threads' => $user->threads()->paginate(10),
            'activities' => Activity::feed($user),
//            'activities' => $activities

        ]);
    }


}
