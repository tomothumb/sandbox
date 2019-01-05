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

    protected $whois;

    public function getServer()
    {
        return false;
    }

    public function parse($source)
    {
        $source['parseddata'] = [];
        $this->whois = $source;
        $this->setOrganization();
        $this->setOrganizationEn();
        $this->setNetwork();
        $this->setIpRange();
        return $this;
    }

    private function setNetwork()
    {
        foreach ($this->whois['rawdata'] as $data) {
            foreach (self::LABEL_NETWORK_NAME as $search_key){
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $network_name = preg_replace("/" . $search_key . "/", "", $data);
                    $this->whois['parseddata']['network_name'] = trim($network_name);
                    return;
                }
            }
        }
    }

    private function setOrganization()
    {
        foreach ($this->whois['rawdata'] as $data) {
            foreach (self::LABEL_ORG as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $organization = preg_replace("/" . $search_key . "/", "", $data);
                    $this->whois['parseddata']['organization'] = trim($organization);
                    return;
                }
            }
        }
    }

    private function setOrganizationEn()
    {
        foreach ($this->whois['rawdata'] as $data) {
            foreach (self::LABEL_ORG_EN as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $organization_en = preg_replace("/" . $search_key . "/", "", $data);
                    $this->whois['parseddata']['organization_en'] = trim($organization_en);
                    return;
                }
            }
        }
    }

    private function setIpRange()
    {
        foreach ($this->whois['rawdata'] as $data) {
            foreach (self::LABEL_NETWORK_IP_RANGE as $search_key) {
                if (preg_match("/" . $search_key . "/", $data, $matches)) {
                    $ip_range = preg_replace("/" . $search_key . "/", "", $data);
                    $this->whois['parseddata']['ip_range'] = $this->calcIpRange(trim($ip_range));
                    $this->whois['parseddata']['ip_subnet'] = trim($ip_range);
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

    public function setIp($ip)
    {
        $this->whois['parseddata']['ip'] = $ip;
        return $this;
    }
}

