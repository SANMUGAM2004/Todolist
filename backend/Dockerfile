# First stage: Build stage
FROM node:20.9.0-alpine3.18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker's layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Second stage: Production stage
FROM node:20.9.0-alpine3.18 AS production

# Set the working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app .

# Expose port
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
