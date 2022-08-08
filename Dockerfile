FROM node:18.7-bullseye

RUN npm i -g @nestjs/cli

WORKDIR /app

CMD ["npm", "run", "start:dev"]
