FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm audit fix

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
