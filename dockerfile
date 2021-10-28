FROM node:16-alpine3.11
WORKDIR .
COPY package*.json .
COPY . .
RUN npm install
RUN npm install graphql

ENV TZ Asia/Bangkok

EXPOSE 4000

CMD [ "node", "app.js" ]
