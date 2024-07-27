# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run the application, rebuilding with the correct environment variable
CMD REACT_APP_API_URL=$REACT_APP_API_URL npm run build && serve -s build