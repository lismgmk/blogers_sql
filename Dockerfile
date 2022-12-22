
FROM node:lts-alpine

# ARG NODE_ENV=dev
# ENV NODE_ENV=${NODE_ENV}

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm install

# Copy application sources (.ts, .tsx, js)
COPY . .

# Build application (produces dist/ folder)
RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]

# # Runtime (production) layer
# FROM node:lts-alpine as production

# # Optional NPM automation (auth) token build argument
# # ARG NPM_TOKEN

# # Optionally authenticate NPM registry
# # RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# WORKDIR /app

# # Copy dependencies files
# COPY package*.json ./

# # Install runtime dependecies (without dev/test dependecies)
# RUN npm ci --omit=dev

# # Copy production build
# COPY --from=development /app/dist/ ./dist/

# # Expose application port
# EXPOSE 3000

# # Start application
# CMD [ "node", "dist/main.js" ]