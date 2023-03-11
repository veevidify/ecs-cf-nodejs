FROM node:18.13-alpine

ENV ENV=local
WORKDIR /app

COPY . /app/
RUN npm install

CMD ["npx", "ts-node", "src/server.ts"]
EXPOSE 80
