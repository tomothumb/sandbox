<?php

namespace App\Service\Whois;

use App\Service\Whois\Parser\WhoisParserInterface;
use IPv4\SubnetCalculator;
use phpWhois\Whois;

class WhoisService
{
    public $parser;
    public $result;
    public $source;
    public $ip;

    /**
     * WhoisService constructor.
     * @param $parser
     */
    public function __construct(WhoisParserInterface $parser)
    {
        $this->parser = $parser;
    }

    public function lookup($ip){
        $this->ip = $ip;
        $whois = new Whois();
        if($this->parser->getServer()){
            $whois->useServer('ip', $this->parser->getServer());
        }
        $result = $whois->lookup($ip, true);
//        dd($result);
        $this->setSource($result);
        $this->parse();
        return $this->result;
    }

    public function setSource($source){
        $this->source = $source;
    }

    public function parse(){
        $this->result = $this->parser->parse($this->source)->get();
    }

}
