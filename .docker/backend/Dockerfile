FROM node:12.10.0-alpine

RUN npm install -g -s --no-progress yarn

WORKDIR /usr/app/
COPY --from=aspire_frontend:latest /usr/app/frontend/dist/spa/ ./frontend/build/

WORKDIR /usr/app/backend/
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./
RUN yarn install
COPY ./backend/ .
RUN yarn build

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["yarn", "start:prod"]