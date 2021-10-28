FROM node:16-buster as build

WORKDIR /customers

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build 

FROM nginx:1.12-alpine as prod

COPY --from=build /customers/build /usr/share/nginx/html
COPY --from=build /customers/nginx.conf /etc/nginx/conf.d/default.conf

ENV TZ Asia/Bangkok

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]







