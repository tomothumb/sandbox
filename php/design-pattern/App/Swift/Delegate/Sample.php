<?php

namespace App\Swift\Delegate;

require __DIR__.'/../../../vendor/autoload.php';

use App\Swift\Delegate\Protocol\MailDelegate;
use App\Swift\Delegate\Protocol\NotificationDelegate;


class MailSend implements MailDelegate
{
    public function send()
    {
        // メール送信
        print('mail' . "\n");
    }
}

class SlackNotification implements NotificationDelegate
{
    public function notify()
    {
        // Slackに通底
        print('message to slack' . "\n");
    }
}




class Sample{

    public function run(){
        $data = [
            'subject'=> 'sample subject',
            'body'=> 'sample body',
            'user'=> 'sample user'
        ];

        $bbs1 = new Bbs();
        $bbs1->setMailDelegate(new MailSend());
        $bbs1->post($data);

        $bbs2 = new Bbs();
        $bbs2->setNotificationDelegate(new SlackNotification());
        $bbs2->post($data);

        $bbs3 = new Bbs();
        $bbs3->setMailDelegate(new MailSend());
        $bbs3->setNotificationDelegate(new SlackNotification());
        $bbs3->post($data);

    }
}

$main = new Sample();
$main->run();