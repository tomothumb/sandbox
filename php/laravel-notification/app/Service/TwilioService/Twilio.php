<?php

namespace App\Service\TwilioService;

use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class Twilio
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

    public function sendSMS($to, $body){
        $this->client->messages->create(
            $to,
            array(
                'from' => $this->from,
                'body' => $body
            )
        );
    }

}