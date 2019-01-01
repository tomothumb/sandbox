<?php

namespace App\Service\SampleForTest;

class OuterSample
{

    /**
     * @var InnerSample
     */
    public $service;

    public function __construct($service)
    {
        $this->service = $service;
    }


    public function run()
    {
        return $this->service->hello();
    }
}
