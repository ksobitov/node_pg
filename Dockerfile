ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
