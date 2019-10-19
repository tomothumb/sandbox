### stage1
FROM golang:1.12-alpine AS builder
WORKDIR /go/src/myapp
VOLUME /go/src/myapp

ENV CGO_ENABLED=0

RUN apk add --no-cache \
        alpine-sdk \
        git \
    && go get github.com/oxequa/realize

ENV GO111MODULE="on"

RUN go mod init
RUN go mod download
#RUN go get -d -v

#EXPOSE 8080

#CMD ["/go/bin/realize", "start"]

# $ docker build -f Dockerfile.realize -t hello-realize .
# $ docker run -it -p 8080:8080 -v <~/path_src_dir>:/go/src/app hello-realize

# https://qiita.com/takasp/items/c6288d4836e79801bb19