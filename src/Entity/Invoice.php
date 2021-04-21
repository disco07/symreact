<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     subresourceOperations={
 *          "api_customers_invoices_get_subresource"={
 *              "normalization_context"={"groups"={"invoices_subresources"}}
 *      }
 *     },
 *     attributes={
 *      "pagination_enabled"=true,
 *      "pagination_items_per_page"=20,
 *      "order": {"sentAt":"desc"}
 *     },
 *     normalizationContext={"groups"={"read:invoices"}},
 *     denormalizationContext={"desable_type_enforcement"=true}
 * )
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:invoices", "read:customer", "invoices_subresources"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:invoices", "read:customer", "invoices_subresources"})
     * @Assert\NotBlank(message="Le montant est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant doit être un chiffre")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:invoices", "read:customer", "invoices_subresources"})
     * @Assert\NotBlank(message="La date ne doit pas être vide")
     * @Assert\DateTime(message="Veillez ecrire une date valide")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:invoices", "read:customer", "invoices_subresources"})
     * @Assert\NotBlank(message="Le status est obigatoire")
     * @Assert\Choice(choices={"PAID", "CANCELLED", "SENT"}, message="Le status doit être PAID, CANCELLED, SENT")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:invoices"})
     * @Assert\NotBlank(message="Le client doit être renseigné")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:invoices", "read:customer", "invoices_subresources"})
     * @Assert\NotBlank(message="Il faut absolument une facture")
     * @Assert\Type(type="integer", message="Le chrono doit être un nombre")
     */
    private $chrono;

    /**
     * @return User|null
     * @Groups({"read:invoices", "invoices_subresources"})
     */
    public function getUser(): ?User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
