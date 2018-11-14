<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Inquiry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Class AdminInquiryListController
 * @package AppBundle\Controller
 * @Route("/admin/inquiry")
 */
class AdminInquiryListController extends Controller
{

    /**
     * @Route("/")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $inquiryRepository = $em->getRepository("AppBundle:Inquiry");
        $inquiryList = $inquiryRepository->findBy([], ['id' => 'DESC']);

        return $this->render("Admin/Inquiry/index.html.twig",
            ['inquiryList' => $inquiryList]
        );
    }

}
