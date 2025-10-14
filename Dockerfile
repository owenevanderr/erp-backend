FROM node:18-alpine

WORKDIR /app



COPY package*.json ./

# Install depedencies 
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate
# Build TypeScript
RUN npm run build



EXPOSE 3000

CMD ["node", "dist/main.js"]
