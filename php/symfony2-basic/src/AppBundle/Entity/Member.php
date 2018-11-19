<?php

namespace AppBundle\Entity;

class Member
{
    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $part;

    /**
     * @var \DateTime
     */
    private $joinedDate;

    /**
     * Member constructor.
     * @param $name
     * @param $part
     * @param $joinedDate
     */
    public function __construct($name, $part, $joinedDate)
    {
        $this->name = $name;
        $this->part = $part;
        $this->joinedDate = $joinedDate;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getPart(): string
    {
        return $this->part;
    }

    /**
     * @param string $part
     */
    public function setPart(string $part): void
    {
        $this->part = $part;
    }

    /**
     * @return \DateTime
     */
    public function getJoinedDate(): \DateTime
    {
        return $this->joinedDate;
    }

    /**
     * @param \DateTime $joinedDate
     */
    public function setJoinedDate(\DateTime $joinedDate): void
    {
        $this->joinedDate = $joinedDate;
    }


}