"use client"

import { useEffect, useRef, useState } from "react"
import { Navigation, Clock } from "lucide-react"

export function DeliveryMap({ order, userLocation }) {
  const mapRef = useRef(null)
  const [riderLocation, setRiderLocation] = useState({
    lat: 19.0896, // Thadomal Shahani Engineering College
    lng: 72.8656,
  })

  // Simulate rider movement
  useEffect(() => {
    if (!userLocation || order.deliveryStage === "delivered") return

    const interval = setInterval(() => {
      setRiderLocation((prev) => {
        const targetLat = userLocation.latitude
        const targetLng = userLocation.longitude

        // Move rider closer to user location
        const latDiff = (targetLat - prev.lat) * 0.1
        const lngDiff = (targetLng - prev.lng) * 0.1

        return {
          lat: prev.lat + latDiff,
          lng: prev.lng + lngDiff,
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [userLocation, order.deliveryStage])

  useEffect(() => {
    if (!mapRef.current || !userLocation) return

    // Create a simple map visualization
    const mapContainer = mapRef.current
    mapContainer.innerHTML = `
      <div class="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <!-- Store Location -->
        <div class="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
          <div class="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium">Store</span>
        </div>
        
        <!-- Rider Location -->
        <div class="absolute" style="top: ${30 + (riderLocation.lat - 19.08) * 1000}%; left: ${30 + (riderLocation.lng - 72.86) * 1000}%;">
          <div class="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <span class="text-sm font-medium">Rider</span>
          </div>
        </div>
        
        <!-- User Location -->
        <div class="absolute bottom-4 right-4 flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-full shadow-lg">
          <div class="w-3 h-3 bg-white rounded-full"></div>
          <span class="text-sm font-medium">You</span>
        </div>
        
        <!-- Route Line -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <path 
            d="M 60 60 Q 200 150 300 240" 
            stroke="#6366f1" 
            strokeWidth="3" 
            strokeDasharray="10,5" 
            fill="none"
            class="animate-pulse"
          />
        </svg>
      </div>
    `
  }, [userLocation, riderLocation])

  const getDeliveryStageInfo = () => {
    switch (order.deliveryStage) {
      case "order_placed":
        return { text: "Order Confirmed", color: "text-blue-600", icon: "📋" }
      case "preparing":
        return { text: "Preparing Order", color: "text-orange-600", icon: "👨‍🍳" }
      case "picked_up":
        return { text: "Order Picked Up", color: "text-purple-600", icon: "📦" }
      case "on_the_way":
        return { text: "Rider On The Way", color: "text-indigo-600", icon: "🏍️" }
      case "delivered":
        return { text: "Order Delivered", color: "text-green-600", icon: "✅" }
      default:
        return { text: "Processing", color: "text-gray-600", icon: "⏳" }
    }
  }

  const stageInfo = getDeliveryStageInfo()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Navigation className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Live Tracking</h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 ${stageInfo.color}`}>
            <span>{stageInfo.icon}</span>
            <span className="text-sm font-medium">{stageInfo.text}</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-64 p-4">
        <div ref={mapRef} className="w-full h-full"></div>
      </div>

      {/* Delivery Info */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Estimated delivery</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {new Date(order.estimatedDelivery).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
