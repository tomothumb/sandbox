<?php

namespace App\Service\SmsSender\Provider;


use App\Service\SmsSender\Contracts\SmsSendable;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class Twilio implements SmsSendable
{
    private $client;
    private $from;

    public function __construct($sid,$token,$from)
    {
        $this->from = $from;
        try {
            $this->client = new Client($sid, $token);
        } catch (ConfigurationException $e) {
            \Log::error($e->getMessage());
        }
    }

    public function sendSMS($to, $body)
    {
        $this->client->messages->create(
            $to,
            array(
                'from' => $this->from,
                'body' => $body
            )
        );
    }
}