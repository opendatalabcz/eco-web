FROM node:14-slim
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
COPY .env.docker /usr/src/app/.env
CMD ["npm", "start"]
EXPOSE 5000
