FROM node:18.12.1-alpine as base
FROM base as builder
WORKDIR /app
ARG DB_URL
ENV DB_URL=${DB_URL}
COPY package.json yarn.lock ./
RUN npm install -g npm@9.6.5
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn db:generate
RUN yarn build
RUN yarn db:migration:run
RUN yarn db:seeds:run
CMD [ "yarn", "start" ]