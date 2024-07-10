FROM node:18
WORKDIR /usr/src/playvs-api
COPY ./package.json .
RUN npm cache clean --force
RUN npm install --only=prod