FROM node:alpine

WORKDIR /gym-webapp/
COPY /public/ /gym-webapp/public
COPY /src/ /gym-webapp/src
COPY /tsconfig.json /package.json /gym-webapp/
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]