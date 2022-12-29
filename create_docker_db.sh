#!/usr/bin/bash

# Скрипт запускается для разворачивания докера и базы.

cd ./deploy/dev && \
sudo  docker run --name 14.6vova --rm -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=2156128 -e PGDATA=/var/lib/postgresql/data/pgdata -v /tmp:/var/lib/postgresql/data -p 5432:5432  postgres:14.6
