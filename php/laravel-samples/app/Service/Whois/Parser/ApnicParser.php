<?php

namespace App\Service\Whois\Parser;

class ApnicParser
{
    protected $result;
    protected $source;

    public function setSource($source)
    {
        $this->source = $source;
        return $this;
    }

    public function get()
    {
        return $this->result;
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

    private function setNetwork()
    {
        $this->result['parseddata']['network_name'] = $this->result['rawdata']->remarks[0]->description[0];
    }

    private function setOrganization()
    {
        $this->result['parseddata']['organization'] = $this->result['rawdata']->remarks[0]->description[1];
    }

    private function setOrganizationEn()
    {
        $this->result['parseddata']['organization_en'] = $this->result['rawdata']->remarks[0]->description[1];
    }

    private function setIpRange()
    {
        $this->result['parseddata']['ip_range'] = [
            'from' => $this->result['rawdata']->startAddress,
            'to' => $this->result['rawdata']->endAddress
        ];
        $this->result['parseddata']['ip_subnet'] = "";
    }

    private function setCountry(){
        $this->result['parseddata']['ip_subnet'] = $this->result['rawdata']->country;
    }

    public function setIp($ip)
    {
        $this->result['parseddata']['ip'] = $ip;
        return $this;
    }

}

