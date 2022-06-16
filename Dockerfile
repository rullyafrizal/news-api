FROM node:14.19.3-alpine
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3300

CMD npm start
