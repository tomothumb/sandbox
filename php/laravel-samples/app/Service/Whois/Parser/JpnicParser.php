<?php

namespace App\Service\Whois\Parser;

use IPv4\SubnetCalculator;

class JpnicParser extends DefaultParser
{
    const SERVER = 'whois.nic.ad.jp';
    const LABEL_NETWORK_IP_RANGE = [
        "a. \[IPネットワークアドレス\]",
        "\[IPネットワークアドレス\]"
    ];
    const LABEL_NETWORK_NAME = [
        "b. \[ネットワーク名\]",
        "\[ネットワーク名\]"
    ];
    const LABEL_ORG = [
        "f. \[組織名\]",
        "\[組織名\]"
    ];
    const LABEL_ORG_EN = [
        "g. \[Organization\]",
        "\[Organization\]"
    ];

    public function parse()
    {
        $arr = [];
        foreach ($this->source['rawdata'] as $data) {
            $arr[] = iconv('ISO-2022-JP', 'UTF-8', $data);
        }
        $this->result = [
            'rawdata' => $arr,
            'parseddata' => []
        ];

        $this->setOrganization();
        $this->setOrganizationEn();
        $this->setNetwork();
        $this->setIpRange();
        return $this;
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
//        $network = explode('/', $ip_range);
//        $subnet = new SubnetCalculator($network[0], $network[1]);

        $subnet = SubnetCalculator::factory($ip_range);

        // [192.168.112.0, 192.168.113.255]
        $address_range = $subnet->getIPAddressRange();
        return [
            'from' => $address_range[0],
            'to' => $address_range[1]
        ];
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


}

