package main

import (
	"log"
	"net/http"
	"ranking-service/kafka"
	"ranking-service/ranking"
)

func main() {
	// Kafka consumer runs in the background
	go kafka.ConsumeOrders(ranking.UpdateRanking)

	// Expose rankings over HTTP
	http.HandleFunc("/rankings", ranking.HandleRankingRequest)

	log.Println("🚀 Ranking service running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}