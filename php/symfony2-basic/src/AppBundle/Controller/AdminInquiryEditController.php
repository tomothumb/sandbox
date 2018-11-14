<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Inquiry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AdminInquiryListController
 * @package AppBundle\Controller
 * @Route("/admin/inquiry")
 */
class AdminInquiryEditController extends Controller
{

    /**
     * @Route("/{id}/edit")
     * @ParamConverter("inquiry", class="AppBundle:Inquiry")
     * @Method("get")
     */
    public function inputAction(Inquiry $inquiry)
    {
        $form = $this->createInquiryForm($inquiry);
        return $this->render('Admin/Inquiry/edit.html.twig',
            [
                'form' => $form->createView(),
                'inquiry' => $inquiry
            ]
        );
    }

    private function createInquiryForm(Inquiry $inquiry)
    {
        return $this->createFormBuilder($inquiry,[
            'validation_groups' => ['admin']
        ])
            ->add('processStatus', 'choice', [
                'choices' => [
                    '未対応',
                    '対応中',
                    '対応済'
                ],
                'empty_data' => 0,
                'expanded' => true
            ])
            ->add('processMemo', 'textarea')
            ->add('submit','submit',[
                'label' => '保存'
            ])
            ->getForm()
            ;
    }

    /**
     * @Route("/{id}/edit")
     * @ParamConverter("inquiry", class="AppBundle:Inquiry")
     * @Method("post")
     */
    public function inputPostAction( Request $request, Inquiry $inquiry)
    {
        $form = $this->createInquiryForm($inquiry);
        $form->handleRequest($request);
        if( $form->isValid()){

            $inquiry = $form->getData();

            // DB Insert
            $em = $this->getDoctrine()->getManager();
            $em->persist($inquiry);
            $em->flush();


            // Send Mail
            $message = \Swift_Message::newInstance()
                ->setSubject('Webサイトからのお問い合わせ')
                ->setFrom('webmaster@example.com')
                ->setTo('admin@example.com')
                ->setBody(
                    $this->renderView('mail/inquiry.txt.twig',[
                        'data' => $inquiry
                    ])
                );
            $this->get('mailer')->send($message);

            return $this->redirect($this->generateUrl('app_inquiry_complete'));
        }

        return $this->render('Inquiry/index.html.twig',[
            'form' => $form->createView()
        ]);

    }

}
