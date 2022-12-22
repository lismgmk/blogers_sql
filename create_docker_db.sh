#!/usr/bin/bash

# Скрипт запускается для разворачивания докера и базы.

cd ./deploy/dev && \
docker-compose -p blogger_sql build && \
docker-compose -p blogger_sql up -d postgres && \
# Ожидаем пока база завершит подготовку к работе (Если не работает, заменить на sleep)
./wait-for-it.sh -p postgres:5432 -- node index.js && \
# sleep 5 
echo DBPassword | docker-compose -p blogger_sql run --rm --no-deps postgres psql -h postgres -U postgres -c "CREATE DATABASE graphql_todolist;"
echo 'rm -rf dist/* && yarn tsc && yarn typeorm migration:run' | docker-compose -p blogger_sql run --rm server sh 
docker-compose -p blogger_sql down
# docker-compose -p todolist-graphql-server up
