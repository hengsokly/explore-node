# Base image for Node.js environment
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Expose port for Node.js application (adjust if needed)
EXPOSE 3000

# Start the Node.js application (replace "start.js" with your entry point)
CMD [ "node", "index.js" ]
