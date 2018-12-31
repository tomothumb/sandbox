<?php

namespace Ddd;

use Illuminate\Support\Collection;

interface TodoItemRepositoryInterface
{
    public function find(TodoItemId $id): ?TodoItemInterface;

    public function list(): Collection;

    public function persist(TodoItemInterface $todoItem): TodoItemInterface;

    public function new(array $record): TodoItemInterface;
}