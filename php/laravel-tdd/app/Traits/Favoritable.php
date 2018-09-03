<?php

namespace App\Traits;

use App\Model\Favorite;
use App\Model\Reply;

trait Favoritable
{

    protected static function bootFavoritable()
    {
        static::deleting(function($model){
            $model->favorites->each->delete();
        });
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

    public function unfavorite()
    {
        $condition = [
            'user_id' => auth()->id()
        ];
        return $this->favorites()->where($condition)->get()->each->delete();
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