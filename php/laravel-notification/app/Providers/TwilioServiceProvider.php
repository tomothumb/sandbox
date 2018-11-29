<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Twilio\Rest\Client;

class TwilioServiceProvider extends ServiceProvider
{

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Twilio\Rest\Client', function ($app){
//            config('TWILIO_SID');
//            config('TWILIO_TOKEN');
            return new Client(env('TWILIO_SID'), env('TWILIO_TOKEN'));
        });
    }
}
