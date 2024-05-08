# Build the app in image 'builder' (multi-stage builds)
FROM node:lts-alpine as builder

# Define working directory
WORKDIR /app

# Copy 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files to working directory
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Use nginx server to deliver the application
FROM nginx:alpine

# Transfer the output of the build step from 'builder' stage
COPY --from=builder /app/dist/my-angular-app/ /usr/share/nginx/html

# Replace the default nginx configuration with the one provided by tiangolo/node-frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

