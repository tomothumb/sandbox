<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    protected $guarded = [];

    public function path(){
        return "/threads/{$this->id}";
    }

    public function replies(){
        return $this->hasMany(Reply::class);
    }
    public function user(){
        return $this->belongsTo(\App\User::class,'user_id');
    }

    public function addReply($reply)
    {
        $this->replies()->create($reply);
    }
}
