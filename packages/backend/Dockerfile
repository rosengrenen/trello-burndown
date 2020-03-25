FROM node:12

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package.json yarn.lock .eslintrc.js .prettierrc.js tsconfig.base.json ./

EXPOSE 3000

CMD yarn && yarn --cwd packages/backend dev

FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN apk --no-cache add python make g++

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/backend ./packages/backend

RUN yarn --production=false
RUN yarn --cwd packages/backend build
RUN yarn --production

EXPOSE 3000
CMD yarn --cwd packages/backend start
