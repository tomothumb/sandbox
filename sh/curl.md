# CURL Command

## GET

```
$ curl localhost:8080/

# JSON format
$ curl localhost:8080/ | jq

# With query(JSON)
$ curl localhost:8080/query?q=12345&category=sport
or
$ curl localhost:8080/query?q=12345\&category=sport
```

## POST
```
$ curl -X POST localhost:8080/post/sample -d "post_name=PPOOSSTT&post_message=thisIsBodyMessage"

# With query
$ curl -X POST localhost:8080/post/sample_complex?id=1234 -d "names=ABCDE"

# With query maps
$ curl --globoff -X POST localhost:8080/post/sample_complex?ids[a]=1234\&ids[b]=999 -d "names[first]=ABCDE&names[second]=XYZ"

```
