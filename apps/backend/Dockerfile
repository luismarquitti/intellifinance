FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn workspace @intellifinance/types build
RUN yarn workspace @intellifinance/jobs build
RUN yarn workspace @intellifinance/database build
RUN yarn workspace @intellifinance/backend build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
CMD ["node", "apps/backend/dist/index.js"]
