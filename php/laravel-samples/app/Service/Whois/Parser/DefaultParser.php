<?php

namespace App\Service\Whois\Parser;

use IPv4\SubnetCalculator;

class DefaultParser extends Parser implements WhoisParserInterface
{

    const LABEL_NETWORK_IP_RANGE = [
        "NetRange:"
//        "CIDR:"
    ];
    const LABEL_NETWORK_NAME = [
        "NetName:"
    ];
    const LABEL_ORG = [
        "Organization:"
    ];
    const LABEL_ORG_EN = [
        "Organization:"
    ];

    public function parse()
    {
        $this->result = $this->source;
        $this->result['parseddata'] = [];
        $this->setOrganization();
        $this->setOrganizationEn();
        $this->setNetwork();
        $this->setIpRange();
        return $this;
    }

    public function setNetwork()
    {
        foreach ($this->result['rawdata'] as $data) {
            foreach (self::LABEL_NETWORK_NAME as $search_key){
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $network_name = preg_replace("/" . $search_key . "/", "", $data);
                    $this->result['parseddata']['network_name'] = trim($network_name);
                    return;
                }
            }
        }
    }

    public function setOrganization()
    {
        foreach ($this->result['rawdata'] as $data) {
            foreach (self::LABEL_ORG as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $organization = preg_replace("/" . $search_key . "/", "", $data);
                    $this->result['parseddata']['organization'] = trim($organization);
                    return;
                }
            }
        }
    }

    public function setOrganizationEn()
    {
        foreach ($this->result['rawdata'] as $data) {
            foreach (self::LABEL_ORG_EN as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $organization_en = preg_replace("/" . $search_key . "/", "", $data);
                    $this->result['parseddata']['organization_en'] = trim($organization_en);
                    return;
                }
            }
        }
    }

    public function setIpRange()
    {
        foreach ($this->result['rawdata'] as $data) {
            foreach (self::LABEL_NETWORK_IP_RANGE as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $ip_range = preg_replace("/" . $search_key . "/", "", $data);
                    $this->result['parseddata']['ip_range'] = $this->calcIpRange(trim($ip_range));
                    $this->result['parseddata']['ip_subnet'] = trim($ip_range);
                    return;
                }
            }
        }
    }

    private function calcIpRange($ip_range)
    {
        $address_range = explode(" - ",$ip_range);
        return [
            'from' => $address_range[0],
            'to' => $address_range[1]
        ];
    }

}

