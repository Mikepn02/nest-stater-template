# =========================
# Builder stage
# =========================
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm @nestjs/cli
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

# =========================
# Production stage
# =========================
# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install prod dependencies + prisma CLI (needed to generate client)
RUN pnpm install --prod
RUN pnpm add -D prisma   # or install @prisma/client explicitly if missing

# Copy build output and Prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Install wait-on to wait for Postgres
RUN pnpm add wait-on

EXPOSE 8000

# Wait for Postgres, run migrations, then start app
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/src/main.js"]


# =========================
# Development stage
# =========================
FROM node:20-alpine AS development
WORKDIR /app
RUN npm install -g pnpm @nestjs/cli
COPY . .
RUN pnpm install
RUN npx prisma generate --schema=prisma/schema.prisma
EXPOSE 8000
CMD ["pnpm", "run", "dev"]
