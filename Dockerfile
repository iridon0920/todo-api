FROM node:18.7-bullseye

WORKDIR /app

RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]
