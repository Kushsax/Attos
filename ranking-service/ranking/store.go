package ranking

import (
	"encoding/json"
	"net/http"
	"sort"
	"sync"
)

var mu sync.Mutex
var counts = make(map[string]int)

type RankedItem struct {
	ProductID string json:"productId"
	Orders    int    json:"orders"
}

func UpdateRanking(productID string, qty int) {
	mu.Lock()
	defer mu.Unlock()
	counts[productID] += qty
}

func HandleRankingRequest(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	var list []RankedItem
	for pid, count := range counts {
		list = append(list, RankedItem{ProductID: pid, Orders: count})
	}

	sort.Slice(list, func(i, j int) bool {
		return list[i].Orders > list[j].Orders
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}