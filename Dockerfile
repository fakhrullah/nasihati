FROM node:slim

COPY ./ /usr/share/app

WORKDIR /usr/share/app
RUN npm install

EXPOSE 3000
CMD node app.js
