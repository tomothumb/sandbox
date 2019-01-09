<?php

namespace App\Service\Whois\Parser;

class ApnicParser extends Parser
{

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

    public function setNetwork()
    {
        $this->result['parseddata']['network_name'] = $this->result['rawdata']->remarks[0]->description[0];
    }

    public function setOrganization()
    {
        if( isset($this->result['rawdata']->remarks[0]->description[1])){
            $this->result['parseddata']['organization'] = $this->result['rawdata']->remarks[0]->description[1];
        }else{
            $this->result['parseddata']['organization'] = $this->result['rawdata']->remarks[0]->description[0];
        }
    }

    public function setOrganizationEn()
    {
        if( isset($this->result['rawdata']->remarks[0]->description[1])){
            $this->result['parseddata']['organization_en'] = $this->result['rawdata']->remarks[0]->description[1];
        }else{
            $this->result['parseddata']['organization_en'] = $this->result['rawdata']->remarks[0]->description[0];
        }
    }

    public function setIpRange()
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

}

