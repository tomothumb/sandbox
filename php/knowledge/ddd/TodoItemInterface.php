<?php

namespace Ddd;

use Carbon\Carbon;

interface TodoItemInterface
{
    public function getId(): TodoItemId;

    public function getTitle(): Title;

    public function isCompleted(?Carbon $datetime = null): bool;

    public function markAsCompleted(?Carbon $datetime = null);
}