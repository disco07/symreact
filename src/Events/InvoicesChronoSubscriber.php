<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoicesChronoSubscriber implements EventSubscriberInterface
{

    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoices', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoices(ViewEvent $event)
    {
        $invoices = $event->getControllerResult();
        $methods = $event->getRequest()->getMethod();

        if ($invoices instanceof Invoice && $methods === "POST") {
            $invoices->setChrono($this->repository->findNextChrono($this->security->getUser()));

            if (empty($invoices->getSentAt())) {
                $invoices->setSentAt(new DateTime());
            }
        }
    }
}
