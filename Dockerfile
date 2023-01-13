#docker build --platform linux/amd64 --no-cache -t victorjoab98/gcp-frontend-amd:1.0.0 .
FROM node:18-alpine3.15 as build

# Install python/pip
# ENV PYTHONUNBUFFERED=1
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /app
COPY ./yarn.lock ./
COPY ./package.json ./
RUN yarn install 
COPY . .

RUN REACT_APP_API_URL=http://34.69.50.81:4000/api \
    yarn run build

FROM nginx
EXPOSE 3000
COPY ./produccion/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html


