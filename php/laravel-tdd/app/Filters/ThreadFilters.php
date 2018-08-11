<?php

namespace App\Filters;

use App\User;

class ThreadFilters extends Filters
{
    protected $filters = ['by'];

    protected function by($username)
    {
        $user = User::where('name', $username)->firstOrFail();
        $this->querybuilder->where('user_id', $user->id);
    }

}
