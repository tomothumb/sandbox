<?php

namespace App\Http\Controllers;

use App\Model\Thread;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function show(\App\User $user)
    {
        $activities = $this->getActivities($user);
//        return $activities;
        return view('profiles.show',[
            'profileUser' => $user,
            'threads' => $user->threads()->paginate(10),
            'activities' => $activities
        ]);
    }

    /**
     * @param \App\User $user
     * @return \App\User[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Query\Builder[]|\Illuminate\Support\Collection
     */
    protected function getActivities(\App\User $user)
    {
        return $user->activities()->with('subject')->take(50)->get()->groupBy(function ($activity) {
            return $activity->created_at->format('Y-m-d');
        });
    }
}
