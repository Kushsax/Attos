FROM golang:latest

WORKDIR /app
COPY . .
RUN go mod tidy && go build -o ranking-service

EXPOSE 8080
CMD ["./ranking-service"]