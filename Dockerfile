# docker run -itp 8443:8443 frontend

FROM node:lts-alpine

EXPOSE 8443

WORKDIR "/Application"

COPY build /Application

RUN npm install --global "serve"

CMD ["serve", "--single", ".", "--listen", "8443", "--no-clipboard"]