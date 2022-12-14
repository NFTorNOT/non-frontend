FROM node:18
WORKDIR /app
ARG ENV
ADD package.json /app
RUN npm install
ADD . /app

RUN mv $ENV.env .env

RUN npx next build
RUN rm -f .env.local
EXPOSE 3000
CMD ["npx", "next", "start"]
