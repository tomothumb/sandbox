<?php

namespace Ddd;

class AddTodoItem
{
    private $repository;

    /**
     * AddTodoItem constructor.
     * @param $repository
     */
    public function __construct(TodoItemRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(array $record): TodoItemInterface
    {
        $todoItem = $this->repository->new($record);
        return $this->repository->persist($todoItem);
    }


}