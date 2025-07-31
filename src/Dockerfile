FROM node:18-alpine

WORKDIR /letsDo-app-root

ADD src src

COPY ../webpack.config.mjs .

COPY ../package.json .

RUN npm install

EXPOSE ${FRONTEND_PORT}

CMD [ "npm", "start" ]