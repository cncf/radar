FROM node:14.5-slim

RUN apt-get update && apt-get install -y fontconfig

WORKDIR /project

COPY package.json .
COPY yarn.lock .

RUN yarn install

CMD ["yarn", "dev"]
