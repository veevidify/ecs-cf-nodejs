FROM node:18.13-alpine

ENV ENV=local
WORKDIR /app

COPY . /app/
RUN npm install

CMD ["npm", "run", "start-dev"]
EXPOSE 80
