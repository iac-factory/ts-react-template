FROM node:lts-alpine

WORKDIR "/Application"

COPY ./build /Application

RUN npm install --global "serve"

# CMD ["serve", "--single", ".", "--listen", "8080", "--no-clipboard"]
