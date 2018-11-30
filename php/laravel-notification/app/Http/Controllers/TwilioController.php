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
        $body_message = 'こんにちは! This is TwilioServiceのデモです!';
        $twilio_client = app()->get('TwilioService');
        $twilio_client->sendSMS($phone_number, $body_message);

        return redirect('/twilio/');
    }

}
