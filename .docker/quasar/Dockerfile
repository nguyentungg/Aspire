FROM node:16.0

RUN npm install -g @quasar/cli

WORKDIR /var/www

ENV NODE_ENV=development
COPY ./frontend/package.json /var/wwwpackage.json
RUN npm install

COPY ./frontend /var/www

EXPOSE 8080
VOLUME /var/www

CMD ["quasar", "dev"] 