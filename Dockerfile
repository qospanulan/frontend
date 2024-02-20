FROM node:18-alpine

WORKDIR /react-front/

COPY public/ /react-front/public
COPY src/ /react-front/src
COPY package.json /react-front/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
