FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
