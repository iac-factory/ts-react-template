FROM node:lts-alpine

WORKDIR "/Application"

COPY ./build /Application

RUN npm install --global "serve"
