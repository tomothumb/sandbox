<?php

namespace App\Swift\Delegate;

require __DIR__.'/../../../vendor/autoload.php';

use App\Swift\Delegate\Protocol\MailDelegate;
use App\Swift\Delegate\Protocol\NotificationDelegate;


class Sample3 implements MailDelegate, NotificationDelegate{

    private $bbs;
    public function __construct()
    {
        $this->bbs = new Bbs();
    }

    public function index(){
        return $this->bbs->getAll();
    }

    public function run(){
        $data = [
            'subject'=> 'sample subject',
            'body'=> 'sample body'
        ];

        $this->bbs->setMailDelegate(new self());
        $this->bbs->setNotificationDelegate(new self());
        $this->bbs->post($data);
    }

    // for MailDelegate Protocol
    public function send()
    {
        // メール送信
        print('mail' . "\n");
    }

    // for NotificationDelegate Protocol
    public function notify()
    {
        // Slackに通底
        print('message to slack' . "\n");
    }

}

$main = new Sample3();
$main->run();