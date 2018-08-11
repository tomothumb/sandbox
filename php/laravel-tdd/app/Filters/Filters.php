<?php

namespace App\Filters;

use App\User;

abstract class Filters
{
    protected $querybuilder;
    protected $request;

    protected $filters = [];

    /**
     * ThreadFilters constructor.
     */
    public function __construct(\Request $request)
    {
        $this->request = request();
    }

    public function apply($querybuilder)
    {
        $this->querybuilder = $querybuilder;

        foreach ($this->getFilters() as $filter => $value){
            if(method_exists($this, $filter)){
                $this->$filter($value);
            }
        }
        return $this->querybuilder;
    }

    /**
     * @return array
     */
    protected function getFilters(): array
    {
        return $this->request->only($this->filters);
    }
}
