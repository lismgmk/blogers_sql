
FROM node:lts-alpine

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

RUN npm install

# Copy application sources (.ts, .tsx, js)
COPY . .

# Build application (produces dist/ folder)
RUN npm run build

EXPOSE 8000
CMD [ "node", "dist/main" ]
