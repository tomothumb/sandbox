<?php

namespace App\Http\Controllers;

use App\Service\SmsSender\Contracts\SmsSendable;
use Illuminate\Http\Request;

class TwilioController extends Controller
{

    public function index()
    {
        return view('twilio.index');
    }

    public function sendSMS($phone_number)
    {
        $body_message = 'こんにちは! This is TwilioServiceのFacadeデモ。';
        \Twilio::sendSMS($phone_number, $body_message);
        return redirect('/twilio/');
    }

    public function sendSMSByDI($phone_number, SmsSendable $sms_service)
    {
        $body_message = 'こんにちは! This is TwilioServiceのFacadeデモ。DI Provider  https://google.com/';
        $body_message = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ  https://google.com/';
        $sms_service->sendSMS($phone_number, $body_message);
        return redirect('/twilio/');
    }

}
