FROM node:latest AS builder

WORKDIR /app

COPY frontend-service/package*.json ./
RUN npm install

COPY frontend-service/ ./
RUN npm run build 

FROM node:latest

WORKDIR /app

COPY --from=builder /app ./
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]