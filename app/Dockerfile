FROM node:25-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run db-generate
RUN npm run db-migrate
RUN npm run db-seed

EXPOSE 8080

# Start Vite dev server
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port ${PORT:-8080}"]
