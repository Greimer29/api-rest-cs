FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
# expose 4000
# RUN npm run ts-build
# CMD ["node", "dist/index.js"]