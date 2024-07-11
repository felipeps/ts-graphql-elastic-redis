FROM node:20
WORKDIR /usr/src/playvs-api
COPY ./package.json .
RUN npm cache clean --force
RUN npm install --only=prod