ARG NODE_VERSION=22.18.0
ARG PNPM_VERSION=10.15.1

FROM node:${NODE_VERSION}-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@${PNPM_VERSION}

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD pnpm dev
