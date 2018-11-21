Symfony2 demo
=============

## console
```
$ php app/console server:start
$ php app/console server:start 127.0.0.1:8888

$ php app/console generate:controller
$ php app/console doctrine:database:create
$ php app/console doctrine:generate:entity
$ php app/console doctrine:schema:create
$ php app/console doctrine:schema:update
$ php app/console doctrine:schema:validate

$ php app/console doctrine:schema:update --dump-sql
$ php app/console doctrine:schema:update --force

$ php app/console cache:clear


$ php app/console debug:router

$ php app/console debug:container
$ php app/console debug:container --parameters

# Debug
$ php app/console debug:config framework
$ php app/console config:dump-reference framework

```

## Test
```
$ phpunit -c app
$ phpunit -c app --debug

# load testsuite setting which is written on phpunit.xml.dist, then run them.
$ phpunit -c app --testsuite=unit
$ phpunit -c app --testsuite=functional
$ phpunit -c app --testsuite=all
$ phpunit -c app --testsuite=unit --exclude-group slow
    /**
     * @group slow
     */


```