# Dockerfile for API (Express)
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --filter=@turbo-stack/api

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=deps /app/node_modules ./node_modules

USER apiuser

EXPOSE 3001

ENV PORT 3001

CMD ["node", "apps/api/dist/index.js"]
