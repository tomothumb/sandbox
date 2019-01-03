<?php

namespace App\Service\Whois\Parser;

use IPv4\SubnetCalculator;

class JpnicParser extends Parser implements WhoisParserInterface
{
    const SERVER = 'whois.nic.ad.jp';
    const LABEL_NETWORK_IP_RANGE = "a. \[IPネットワークアドレス\]";
    const LABEL_NETWORK_NAME = "b. \[ネットワーク名\]";
    const LABEL_ORG = "f. \[組織名\]";
    const LABEL_ORG_EN = "g. \[Organization\]";

    protected $whois;

    public function getServer()
    {
        return self::SERVER;
    }

    public function parse($source)
    {
        $arr = [];
        foreach ($source['rawdata'] as $data) {
            $arr[] = iconv('ISO-2022-JP', 'UTF-8', $data);
        }
        $source['rawdata'] = $arr;
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
            if (preg_match("/" . self::LABEL_NETWORK_NAME . "/", $data, $matches)) {
                $network_name = preg_replace("/" . self::LABEL_NETWORK_NAME . "/", "", $data);
                $this->whois['parseddata']['network_name'] = trim($network_name);
                return;
            }
        }
    }

    private function setOrganization()
    {
        foreach ($this->whois['rawdata'] as $data) {
            if (preg_match("/" . self::LABEL_ORG . "/", $data, $matches)) {
                $organization = preg_replace("/" . self::LABEL_ORG . "/", "", $data);
                $this->whois['parseddata']['organization'] = trim($organization);
                return;
            }
        }
    }

    private function setOrganizationEn()
    {
        foreach ($this->whois['rawdata'] as $data) {
            if (preg_match("/" . self::LABEL_ORG_EN . "/", $data, $matches)) {
                $organization_en = preg_replace("/" . self::LABEL_ORG_EN . "/", "", $data);
                $this->whois['parseddata']['organization_en'] = trim($organization_en);
                return;
            }
        }
    }

    private function setIpRange()
    {
        foreach ($this->whois['rawdata'] as $data) {
            if (preg_match("/" . self::LABEL_NETWORK_IP_RANGE . "/", $data, $matches)) {
                $ip_range = preg_replace("/" . self::LABEL_NETWORK_IP_RANGE . "/", "", $data);
                $this->whois['parseddata']['ip_range'] = $this->calcIpRange(trim($ip_range));
                $this->whois['parseddata']['ip_subnet'] = trim($ip_range);
                return;
            }
        }
    }

    private function calcIpRange($ip_range)
    {
        $network = explode('/', $ip_range);
        $subnet = new SubnetCalculator($network[0], $network[1]);
        $address_range = $subnet->getIPAddressRange();         // [192.168.112.0, 192.168.113.255]
        return [
            'from' => $address_range[0],
            'to' => $address_range[1]
        ];
    }

}

