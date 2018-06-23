<?php

namespace App\Http\Controllers;

use App\Service\Crawler\YahooNewsCrawler;
use Illuminate\Http\Request;

use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use FCM;

class NotificationDemoController extends Controller
{

    public function welcome()
    {
        return view('notification');
    }

    public function subscript($request){
        file_put_contents("subscriptions.data", $request->subscription. PHP_EOL, FILE_APPEND);
    }

    public function notificationData()
    {
        $data = [
            "title" =>"通知テスト" . date("Y/m/d H:i:s"),
            "icon" => "/image/icon.png",
            "body" => "通知本文になります。" . $_GET['endpoint'],
            "url" => " https://" . $_SERVER["HTTP_HOST"]
        ];
        return response()->json($data);
    }

    public function send($request =null )
    {
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60*20);

        $notificationBuilder = new PayloadNotificationBuilder('my title');
        $notificationBuilder->setBody('Hello world')
            ->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData(['a_data' => 'my_data']);

        $option = $optionBuilder->build();
        $notification = $notificationBuilder->build();
        $data = $dataBuilder->build();

//        $token = "a_registration_from_your_database";
        $token = env("FCM_TOKEN");

        $downstreamResponse = FCM::sendTo($token, $option, $notification, $data);

        dump($downstreamResponse->numberSuccess());
        dump($downstreamResponse->numberFailure());
        dump($downstreamResponse->numberModification());

//return Array - you must remove all this tokens in your database
        dump($downstreamResponse->tokensToDelete());

//return Array (key : oldToken, value : new token - you must change the token in your database )
        dump($downstreamResponse->tokensToModify());

//return Array - you should try to resend the message to the tokens in the array
        dump($downstreamResponse->tokensToRetry());

    }

}
