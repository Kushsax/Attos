package kafka

import (
	"context"
	"log"
	"strings"

	"github.com/segmentio/kafka-go"
)

func ConsumeOrders(onOrder func(string, int)) {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{"kafka:9092"},
		Topic:    "orders",
		GroupID:  "ranking-service",
		MinBytes: 1e3,
		MaxBytes: 1e6,
	})

	log.Println("🟡 Waiting for order events on 'orders' topic...")

	for {
		msg, err := r.ReadMessage(context.Background())
		if err != nil {
			log.Println("❌ Kafka read error:", err)
			continue
		}

		log.Printf("📦 Event: %s\n", string(msg.Value))

		// Parse: Order (productId) placed at (timestamp) with quantity (XYZ)
		text := string(msg.Value)
		productID := extractBetween(text, "Order (", ")")
		qtyStr := extractBetween(text, "quantity (", ")")
		var qty int
		_, err = fmt.Sscanf(qtyStr, "%d", &qty)
		if err != nil || productID == "" {
			log.Println("⚠️ Invalid message format")
			continue
		}

		onOrder(productID, qty)
	}
}

func extractBetween(s, start, end string) string {
	sIdx := strings.Index(s, start)
	eIdx := strings.Index(s, end)
	if sIdx == -1 || eIdx == -1 || sIdx+len(start) >= eIdx {
		return ""
	}
	return s[sIdx+len(start) : eIdx]
}