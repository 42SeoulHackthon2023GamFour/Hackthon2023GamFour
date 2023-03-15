FROM node:latest

WORKDIR /pwd

RUN apt-get update -y
RUN npm install -g npm@9
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
# CMD tail -f /dev/null