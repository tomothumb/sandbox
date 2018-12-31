<?php

namespace Ddd;


final class TodoItemId
{
    private $value;

    private function __construct(?int $value)
    {
        $this->value = $value;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public static function of(?int $value): self
    {
        return new self($value);
    }
}