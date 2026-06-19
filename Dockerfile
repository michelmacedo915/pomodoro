FROM node:20-alpine

WORKDIR /app

# Install system deps needed by some native-adjacent npm packages
RUN apk add --no-cache git python3 make g++

# Copy manifests first for layer caching
COPY package.json ./

# Install JS deps, then pin to Expo SDK versions
RUN npm install && npm install react-native-web react-dom

# Copy the rest of the source
COPY . .

# Expo web dev server
EXPOSE 8081

ENV EXPO_NO_TELEMETRY=1

ENV CI=1

CMD ["npx", "expo", "start", "--web", "--host", "lan"]
