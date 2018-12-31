<?php

namespace Ddd;


final class Title
{
    private $value;

    private function __construct(?string $value)
    {
        $this->value = $value;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public static function of(?string $value): self
    {
        return new self($value);
    }
}