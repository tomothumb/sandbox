<?php

namespace App\Service\Whois\Request;

class ApnicRequest extends RdapRequest
{
    const SERVER = 'rdap.apnic.net';
    const REQUEST_PATH = '/ip/';

    public function getServer(){
        return "http://".self::SERVER;
    }
    public function getRequestPath($ipv4){
        return self::REQUEST_PATH . $ipv4;
    }

//
//    public function lookup($ipv4)
//    {
//        $client = new \GuzzleHttp\Client([
//            'base_uri' => $this->getServer(),
//            'headers' => [
//                'Accept' => 'application/json',
//            ]
//        ]);
//        $response = $client->request('GET', $this->getRequestPath($ipv4),
//            [
//                'allow_redirects' => true,
//            ]);
//        $response_body = (string)$response->getBody();
//        $obj = json_decode($response_body);
//        return $obj;
//    }

}

