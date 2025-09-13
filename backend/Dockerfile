# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install build tools required for native modules
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
