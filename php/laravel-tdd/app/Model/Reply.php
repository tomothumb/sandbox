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

    public function user()
    {
        return $this->hasOne(\App\User::class, 'id', 'user_id');
    }

}
