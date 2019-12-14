FROM golang

WORKDIR $PWD/src/server
ENV GO111MODULE=on

RUN apt update && \
    apt upgrade -y

ADD . ./

EXPOSE 8080

CMD go run main.go