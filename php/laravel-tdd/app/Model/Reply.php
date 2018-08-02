<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{

    protected $guarded = [];

    public function user(){
        return $this->hasOne(\App\User::class,'id','user_id');
    }
}
