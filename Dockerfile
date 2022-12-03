# Stage `node`. Based on Node.js. Compile Angular and Build dist artifacts.
FROM node:16 as BUILDER
RUN mkdir /app
ARG ENV
COPY . /app
WORKDIR /app
# RUN mv $ENV.env .env
# RUN npm install --global yarn
RUN npm install
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine as app
COPY --from=BUILDER /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN apk update && \
    apk upgrade
EXPOSE 80