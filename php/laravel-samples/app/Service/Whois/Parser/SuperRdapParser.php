<?php

namespace App\Service\Whois\Parser;

class SuperRdapParser extends Parser
{

    private $vcard;

    public function parse()
    {
        $this->result = [
            'rawdata' => $this->source,
            'parseddata' => []
        ];
        if( isset($this->source->entities[0]->vcardArray[1]) ){
            $this->vcard = $this->source->entities[0]->vcardArray[1];
            $this->setOrganization();
            $this->setOrganizationEn();
        }
        $this->setNetwork();
        $this->setIpRange();
        $this->setCountry();

        return $this;
    }

    public function setNetwork()
    {
        if(isset($this->result['rawdata']->name)){
            $this->result['parseddata']['network_name'] = $this->result['rawdata']->name;
        }
    }

    public function setOrganization()
    {
        $kind = "";
        $org = "";
        foreach ($this->vcard as $item){
            if($item[0] === "kind") {
                if( "individual" === $item[3]){
                    $kind = "[個人]";
                }
            }
            if($item[0] === "fn") {
                $org = $item[3];
            }
        }
        $this->result['parseddata']['organization'] = $kind . $org;
        $this->result['parseddata']['organization_en'] = $kind . $org;
    }

    public function setOrganizationEn()
    {
//        foreach ($this->vcard as $item){
//            if($item[0] !== "fn") { continue; }
//            $this->result['parseddata']['organization_en'] = $item[3];
//            return;
//        }
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
        $this->result['parseddata']['country'] = $this->result['rawdata']->country ?? "";
    }

}

