# Builder stage
FROM node:16.19.0-alpine AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm i

# Copy the rest of the code
COPY . . 

# Generate prisma files
RUN npm run db:generate

# Invoke the build script to transpile ts code to js
RUN npm run build


# Final stage
FROM node:16.19.0-alpine AS service

# Set node environment to production
ENV NODE_ENV production

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Install PM2
RUN npm i -g pm2

# Copy package.json, package-lock.json and process.yml
COPY package*.json ./
# process.yml ./

# Switch to user node
USER node

# Install libraries as user node
RUN npm i --omit=dev

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]