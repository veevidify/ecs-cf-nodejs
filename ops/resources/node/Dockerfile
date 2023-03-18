FROM node:18.13-alpine as builder

ENV ENV=production
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

FROM builder
WORKDIR /app
COPY --from=builder /app/ ./
CMD ["node", "dist/server.js"]

EXPOSE 80
