
FROM node:lts-alpine

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy configuration files
COPY ./tsconfig*.json  ./package*.json /app/

RUN npm install

# Copy application sources (.ts, .tsx, js)
COPY . /app/

# Build application (produces dist/ folder)
RUN npm run build

EXPOSE 8000
CMD [ "node", "dist/main" ]
