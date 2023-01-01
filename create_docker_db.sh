#!/usr/bin/bash

# Скрипт запускается для разворачивания докера и базы.

cd ./deploy/dev && \
sudo  docker run --name 14.6vova -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=2156128  -p 5432:5432  postgres:14.6

 
# echo DBPassword | docker-compose -p blogger_sql run --rm --no-deps postgres psql -h postgres -U postgres -c "CREATE DATABASE graphql_todolist;"
# echo 'rm -rf dist/* && yarn tsc && yarn typeorm migration:run' | docker-compose -p blogger_sql run --rm server sh 