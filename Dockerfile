FROM node:18-alpine

WORKDIR /app



COPY . .

# Install depedencies 
RUN npm install
# Build TypeScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
