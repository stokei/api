FROM node:18.12.1-alpine as base
FROM base as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install -g npm@9.6.5
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn db:generate
RUN yarn build

FROM base as runner
ENV NODE_ENV production
RUN npm install -g npm@9.6.5
USER node
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
CMD [ "npm", "run", "start:prod" ]