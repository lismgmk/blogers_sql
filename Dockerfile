
FROM node:lts-alpine

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy configuration files
# COPY ./tsconfig*.json  ./package*.json /app/
COPY  package*.json ./

RUN npm install

# Copy application sources (.ts, .tsx, js)
COPY . .
# COPY . /app/

# Build application (produces dist/ folder)
RUN npm run build

EXPOSE 8000
CMD [ "node", "dist/main.js" ]
