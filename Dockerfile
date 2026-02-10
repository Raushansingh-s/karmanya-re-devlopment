# Use Node.js 18 LTS as base image
FROM node:18-slim

# Set environment to production
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port from environment or default
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
