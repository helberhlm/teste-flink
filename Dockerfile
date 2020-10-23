FROM node:12.16.1-alpine
RUN rm -rf /var/www && mkdir /var/www
WORKDIR /var/www
COPY . /var/www
RUN  rm -rf .env && \
  npm install pm2 -g && \
  npm install && \
  npm run build
EXPOSE 3000
ENTRYPOINT npm run start:prod
