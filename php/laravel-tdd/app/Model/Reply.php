<?php

namespace App\Model;

use App\Traits\Favoritable;
use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use Favoritable, RecordsActivity;

    protected $guarded = [];

    protected $with = ['user','favorites'];

    protected $appends = ['favoritesCount','isFavorited'];

    public function user()
    {
        return $this->hasOne(\App\User::class, 'id', 'user_id');
    }

    public function thread()
    {
        return $this->belongsTo(\App\Model\Thread::class);
    }

    public function path(){
        return "{$this->thread->path()}#reply-{$this->id}";
    }

}
