<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function user_followings()
    {
        return $this->belongsToMany('\App\User','user_follows','following_user_id','followed_user_id');
    }

    public function follow(User $user)
    {
        try{
            $this->user_followings()->attach($user->id);
            session()->flash('message','Success follow');
        } catch (\Exception $e){
            session()->flash('message','This user is already followed by you.');
        }
    }

    public function unfollow(User $user)
    {
        try{
            $this->user_followings()->detach($user->id);
            session()->flash('message','Success unfollow');
        } catch (\Exception $e){
            session()->flash('message','This user is not followed by you.');

        }
    }






}
