<?php

namespace AppBundle\Controller\Api;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as REST;
use FOS\RestBundle\View\View;

class ConcertController extends FOSRestController
{

    public function getConcertsAction()
    {
        $em = $this->get('doctrine')->getManager();
        $repository = $em->getRepository('AppBundle:Concert');
        $concertList = $repository->findAll();

        return $concertList;
    }

}