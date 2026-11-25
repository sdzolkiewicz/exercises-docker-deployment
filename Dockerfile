FROM node:18-alpine

EXPOSE 5173

WORKDIR /usr/src/app

COPY . .

RUN npm install 
RUN npm run build 
RUN npm install -g serve

CMD ["serve","-s","-l","5173","dist"]

