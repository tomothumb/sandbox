<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'user_id', 'subject', 'body',
    ];

    public function post_comments()
    {
        return $this->hasMany('\App\PostComment', 'post_id','id');
    }

}
