<?php

namespace App\Service\Whois\Request;

class RdapRequest implements WhoisRequestInterface
{

    public function getServer()
    {
        return "";
    }

    public function getRequestPath($ipv4)
    {
        return "";
    }

    public function lookup($ipv4)
    {
        $client = new \GuzzleHttp\Client([
            'base_uri' => $this->getServer(),
            'headers' => [
//                'Accept' => 'application/json',
                'Accept' => 'application/rdap+json',
            ]
        ]);

        $response = $client->request('GET', $this->getRequestPath($ipv4),
            [
                'allow_redirects' => true,
            ]);
        $response_body = (string)$response->getBody();
        $obj = json_decode($response_body);
        return $obj;
    }
}

