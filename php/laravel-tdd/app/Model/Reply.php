<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{

    protected $guarded = [];

    public function user(){
        return $this->hasOne(\App\User::class,'id','user_id');
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
        if (!$this->favorites()->where($condition)->exists()) {
            return $this->favorites()->create($condition);
        }
    }
    public function isFavorited()
    {
        $condition = [
            'user_id' => auth()->id()
        ];
        return $this->favorites()->where($condition)->exists();
    }

}
