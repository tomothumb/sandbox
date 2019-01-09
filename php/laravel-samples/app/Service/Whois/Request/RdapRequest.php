<?php

namespace App\Service\Whois\Request;

class RdapRequest implements WhoisRequestInterface
{
    public function lookup($ipv4){
        $client = new \GuzzleHttp\Client( [
            'base_uri' => $this->getServer(),
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);
        $response = $client->request( 'GET', $this->getRequestPath($ipv4),
            [
                'allow_redirects' => true,
            ] );
        $response_body = (string) $response->getBody();
        return $response_body;
    }
}

