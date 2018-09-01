<?php

namespace App\Traits;

use App\Model\Favorite;
use App\Model\Reply;

trait Favoritable
{

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

    public function unfavorite($user_id)
    {
        $condition = [
            'user_id' => $user_id
        ];
        return $this->favorites()->where('user_id', $user_id)->delete();
    }

    public function isFavorited()
    {
        return !!$this->favorites->where('user_id', auth()->id())->count();
    }

    public function getIsFavoritedAttribute()
    {
        return $this->isFavorited();
    }

    public function getFavoritesCountAttribute()
    {
        return $this->favorites->count();
    }
}