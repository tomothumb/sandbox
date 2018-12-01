<?php
/**
 * Created by PhpStorm.
 * User: tomo
 * Date: 2018-11-30
 * Time: 23:39
 */

namespace App\Service\SmsSender\Contracts;


interface SmsSendable
{
    public function sendSMS($to, $body);

}