FROM node:18.7-bullseye

WORKDIR /app

RUN npm i -g @nestjs/cli

CMD ["npm", "run", "start"]
