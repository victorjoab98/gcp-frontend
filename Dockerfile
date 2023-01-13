#docker build --platform linux/amd64 --no-cache -t victorjoab98/gcp-frontend-amd:1.0.0 .
FROM node:18-alpine3.15 as build
# ENV REACT_APP_API_URL=http://34.69.50.81:4000/api

WORKDIR /app
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN REACT_APP_API_URL=http://34.69.50.81:4000/api \
    npm run build

FROM nginx
EXPOSE 3000
COPY ./produccion/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html


