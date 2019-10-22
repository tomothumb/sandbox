FROM golang:1.13-alpine

WORKDIR /go/src/app
VOLUME /go/src/app

ENV CGO_ENABLED=0
ENV GO111MODULE=on

#COPY . .

RUN apk update \
  && apk add --no-cache git \
  && go get github.com/pilu/fresh
#   \
#  && go get -u github.com/codegangsta/gin


#RUN go mod init
#RUN go mod download


