<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{

    protected $guarded = [];

    protected $with = ['user','favorites'];

    public function user()
    {
        return $this->hasOne(\App\User::class, 'id', 'user_id');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favorited');
    }

    public function favorite($user_id)
    {
        $condition = [
            'user_id' => $user_id
        ];
        if ($this->favorites->where('user_id', $user_id)->count() == 0) {
            return $this->favorites()->create($condition);
        }
    }

    public function isFavorited()
    {
        return !!$this->favorites->where('user_id', auth()->id())->count();
    }

}
