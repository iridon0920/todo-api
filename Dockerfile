FROM node:18.7-bullseye

WORKDIR /app

COPY ./src ./

RUN npm install -g @nestjs/cli

RUN npm install

CMD ["npm", "run", "start"]
