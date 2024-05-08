# Install operating system and dependencies
FROM node:lts-alpine

RUN npm install -g serve
WORKDIR /app/
COPY . .

EXPOSE 8080
CMD ["serve", "trips-offers"]

