<?php

namespace App\Service\Whois\Parser;

class Parser implements WhoisParserInterface
{
    const LABEL_NO = 'This network range is not allocated to';
    protected $result;
    protected $source;

    public function setSource($source)
    {
        $this->source = $source;
        return $this;
    }

    public function parse()
    {
        $this->result = [
            'rawdata' => $this->source,
            'parseddata' => []
        ];
        $this->setOrganization();
        $this->setOrganizationEn();
        $this->setNetwork();
        $this->setIpRange();
        return $this;
    }

    public function setIp($ip)
    {
        $this->result['parseddata']['ip'] = $ip;
        return $this;
    }

    public function get()
    {
        return $this->result;
    }

    public function setNetwork(){}

    public function setOrganization(){}

    public function setOrganizationEn(){}

    public function setIpRange(){}

}
