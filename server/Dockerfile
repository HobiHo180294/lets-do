FROM node:18-alpine

WORKDIR /letsDo-app-root

COPY package.json .

RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}

CMD [ "npm", "start" ]