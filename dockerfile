FROM node:18.4.0-alpine

RUN mkdir -p /home/app/
WORKDIR /home/app
COPY  . .

RUN npm install 

EXPOSE 8500

CMD [ "node", "index.js" ]