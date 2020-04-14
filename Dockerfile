FROM node:12.16.1-alpine

WORKDIR /cil

COPY package*.json ./

RUN npm install --production
RUN npm audit fix

COPY . .
RUN npm run build

EXPOSE "${PORT:-8080}"
CMD ["npm", "start"]
