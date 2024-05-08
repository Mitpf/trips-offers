# Install operating system and dependencies
FROM node:lts-alpine

RUN npm install -g serve
WORKDIR /app
COPY /dist/trips-offers/ .

EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]