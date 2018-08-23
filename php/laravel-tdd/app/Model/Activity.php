<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $guarded = [];


    public function subject()
    {
        return $this->morphTo();
    }

    public static function feed(\App\User $user, $take = 50)
    {
        return static::where('user_id', $user->id)
//        $user
//             ->activities()
            ->with('subject')
            ->latest()
            ->take($take)
            ->get()
            ->groupBy(function ($activity) {
                return $activity->created_at->format('Y-m-d');
            })
            ;
    }

}
