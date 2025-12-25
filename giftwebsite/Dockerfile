# Use Node.js LTS version
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev for building)
RUN npm install

# Copy application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app will run on
EXPOSE 9000

# Run the Express server to serve the React app
CMD ["node", "index.js"]
