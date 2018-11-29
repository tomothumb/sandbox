<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TwilioController extends Controller
{

    public function index()
    {
        return view('twilio.index');
    }

    public function sendSMS($phone_number)
    {
        $twilio_client = app()->get('Twilio\Rest\Client');
        $twilio_client->messages->create(
            $phone_number,
            array(
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => 'こんにちは! This is Twilio デモです!'
            )
        );
        return redirect('/twilio/');
    }

}
