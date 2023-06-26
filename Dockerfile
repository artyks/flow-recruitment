FROM node:18.16.0-alpine

WORKDIR /app

COPY . .

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install

RUN npm run build
