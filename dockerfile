FROM node:14.17.3-buster as build

WORKDIR /guides

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build 

FROM nginx:1.12-alpine as prod

COPY --from=build /guides/build /usr/share/nginx/html
COPY --from=build /guides/nginx.conf /etc/nginx/conf.d/default.conf


ENV TZ Asia/Bangkok


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



