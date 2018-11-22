<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class blogController extends Controller
{
    /**
     * @Route("/blog/")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $blogArticleRepository = $em->getRepository('AppBundle:BlogArticle');
        $blogList = $blogArticleRepository->findBy([],['targetDate'=>'DESC']);

        return $this->render('Blog/index.html.twig',
            ['blogList'=> $blogList])
            ;

    }

    public function latestListAction()
    {
        $em = $this->getDoctrine()->getManager();
        $blogArticleRepository = $em->getRepository('AppBundle:BlogArticle');
        $blogList = $blogArticleRepository->findBy([], ['targetDate' => 'DESC']);

        return $this->render('Blog/latestList.html.twig',[
            'blogList' => $blogList
        ]);
    }
}
