#!/usr/bin/bash

cd ./deploy/dev && \
docker-compose -p pg-server \
    up --build 