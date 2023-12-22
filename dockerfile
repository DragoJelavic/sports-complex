# Use a base image with Node.js
FROM node:14

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to the container
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port used by your application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "serve"]
