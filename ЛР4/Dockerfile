# Stage 1: install dependencies and compile TypeScript
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first to maximize Docker layer cache reuse
COPY package*.json ./
RUN npm install

# Copy application source and TypeScript configuration
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: minimal runtime image
FROM node:22-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Install only production dependencies in the runtime image
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

# The application listens on this port inside the container
EXPOSE 8080

# Health check uses Node's built-in fetch; no extra curl package required
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/api/v1/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]
