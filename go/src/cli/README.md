```
$ docker build -f Dockerfile.dev -t golang_cliapp .

$ docker run --rm -it -p 8080:8080 -v `PWD`:/go/src/myapp golang_cliapp

$ go build
```