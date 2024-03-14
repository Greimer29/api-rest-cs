# Base image with Node.js 16 (adjust if needed)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g @adonisjs/cli

# Start the AdonisJS app
CMD [ "npm", "run", "start"]
