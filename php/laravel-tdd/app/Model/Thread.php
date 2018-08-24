<?php

namespace App\Model;

use App\Traits\RecordsActivity;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{

    use RecordsActivity;

    protected $guarded = [];

    protected $with = ['user','channel'];

    protected static function boot(){
        parent::boot();
        static::addGlobalScope('replyCount', function($builder){
            $builder->withCount('replies');
        });

        static::deleting(function($thread){
            $thread->replies->each->delete();
//            $thread->replies->each(function($reply){
//                $reply->delete();
//            });
        });
    }

    public function path(){
        return "/threads/{$this->channel->slug}/{$this->id}";
    }

    public function replies(){
        return $this->hasMany(Reply::class)
//            ->withCount('favorites')
//            ->with('user')
            ;
    }
    public function user(){
        return $this->belongsTo(\App\User::class,'user_id');
    }

    public function channel(){
        return $this->belongsTo( \App\Model\Channel::class, 'channel_id');
    }

    public function addReply($reply)
    {
        $this->replies()->create($reply);
    }

    public function scopeFilter($query, $filter)
    {
        return $filter->apply($query);
    }


}
