<?php

namespace App\Providers;

use App\Service\TwilioService\Twilio;
use Illuminate\Support\ServiceProvider;

class TwilioServiceProvider extends ServiceProvider
{

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('TwilioService', function($app){
            return new Twilio( env('TWILIO_SID'), env('TWILIO_TOKEN'), env('TWILIO_PHONE_NUMBER') );
        });
    }
}
