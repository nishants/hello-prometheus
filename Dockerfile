FROM node:14

RUN mkdir -p /app

COPY package.json /app
COPY yarn.lock /app
WORKDIR /app

RUN yarn

COPY index.js /app

EXPOSE 8080
CMD [ "yarn", "start" ]