<?php
namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Twilio extends Facade {
    protected static function getFacadeAccessor()
    {
        return 'TwilioService';
    }
}