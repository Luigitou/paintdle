# ──────────────────────────────────────────────────────────
# Shared base: Node + pnpm
# ──────────────────────────────────────────────────────────
FROM node:24-alpine AS base
RUN npm install -g pnpm@10.20.0
WORKDIR /app

# All dependencies (dev included), cached as long as the lockfile is unchanged
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ──────────────────────────────────────────────────────────
# DEV – source code is bind-mounted by docker-compose.yml
# ──────────────────────────────────────────────────────────
FROM deps AS development
COPY . .
EXPOSE 3000
CMD ["pnpm", "start:dev"]

# ──────────────────────────────────────────────────────────
# PROD
# ──────────────────────────────────────────────────────────
FROM deps AS build
COPY . .
RUN pnpm build

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
