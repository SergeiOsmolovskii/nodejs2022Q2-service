FROM node:16-alpine

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE $PORT

CMD ["npm", "start"]