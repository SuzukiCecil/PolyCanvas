FROM node:20-alpine

WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Expose Vite dev server port
EXPOSE 5173

CMD ["sh"]
