FROM node:20.0.0-alpine AS build

COPY ./package.json /home/node/src/package.json

WORKDIR /home/node/src

RUN npm install

COPY . /home/node/src

RUN npm run build

FROM node:20.0.0-alpine

COPY --from=build /home/node/src/build /home/node/app

WORKDIR /home/node/app

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "."]
