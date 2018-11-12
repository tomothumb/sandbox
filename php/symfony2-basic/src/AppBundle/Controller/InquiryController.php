<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


/**
 * Class InquiryController
 * @package AppBundle\Controller
 * @Route("/inquiry")
 */
class InquiryController extends Controller
{
    /**
     * @Route("/index")
     * @Method("get")
     */
    public function indexAction()
    {
        $form = $this->createFormBuilder()
            ->add('name', 'text',[
                'label' => 'お名前'
            ])
            ->add('email', 'text')
            ->add('tel', 'text', [
                'required' => false
            ])
            ->add('type', 'choice', [
                'choices' => [
                    '公園について',
                    'その他'
                ],
                'expanded' => true,
            ])
            ->add('content', 'textarea')
            ->add('submit', 'submit', [
                'label' => '送信'
            ])
            ->getForm();
        return $this->render('Inquiry/index.html.twig', [
            'form' => $form->createView()
        ]);
    }

}
