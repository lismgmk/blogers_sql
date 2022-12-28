#!/usr/bin/bash

# Скрипт запускается для разворачивания докера и базы.

cd ./deploy/dev && \
sudo docker-compose -p pg-server build && \
sudo docker-compose -p pg-server up -d postgres && \
# Ожидаем пока база завершит подготовку к работе (Если не работает, заменить на sleep)
./wait-for-it.sh -p postgres:5432 -- node index.js && \
# sleep 5 
echo DBPassword | docker-compose -p pg-server run --no-deps postgres psql -h postgres -U postgres -c "CREATE DATABASE blog_sql-db;"
echo 'npm run typeorm:run-migration' | docker-compose -p pg-server run server sh 
sudo docker-compose -p pg-server down
# docker-compose -p todolist-graphql-server up
