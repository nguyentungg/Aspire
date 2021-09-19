FROM node:12.10.0-alpine as frontend

RUN npm install -g -s --no-progress yarn
RUN npm install -g @quasar/cli
ENV NODE_ENV=development
WORKDIR /usr/app/frontend/
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install
COPY ./frontend/ ./
RUN yarn build

EXPOSE 8080

CMD ["quasar", "dev"] 