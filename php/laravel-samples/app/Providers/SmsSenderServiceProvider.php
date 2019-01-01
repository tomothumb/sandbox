<?php

namespace App\Providers;


use App\Service\SmsSender\Provider\Twilio;
use Illuminate\Support\ServiceProvider;

class SmsSenderServiceProvider extends ServiceProvider
{

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('App\Service\SmsSender\Contracts\SmsSendable', function($app){
            return new Twilio( env('TWILIO_SID'), env('TWILIO_TOKEN'), env('TWILIO_PHONE_NUMBER') );
        });
    }
}
