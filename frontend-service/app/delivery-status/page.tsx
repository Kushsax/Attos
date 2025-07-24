"use client"

import { useEffect } from "react"
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

<<<<<<< HEAD:frontend-service/app/components/delivery-status-user.js
function Component() {
=======
export default function DeliveryStatusPage() {
  const router = useRouter()

>>>>>>> e268f61 (___):frontend-service/app/delivery-status/page.tsx
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Load CSS
      const cssLink = document.createElement("link")
      cssLink.rel = "stylesheet"
      cssLink.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      document.head.appendChild(cssLink)

      // Load JS
      const leafletScript = document.createElement("script")
      leafletScript.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
      leafletScript.onload = initializeMap
      document.head.appendChild(leafletScript)
    }

    const initializeMap = () => {
      const L = (window as any).L

      const map = L.map("map").setView([28.238, 83.9956], 11)
      const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>"

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "Leaflet &copy; " + mapLink + ", contribution",
        maxZoom: 18,
      }).addTo(map)

      // Create a custom delivery icon
      const deliveryIcon = L.divIcon({
        html: `<div style="background: #16a34a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
          </svg>
        </div>`,
        className: "custom-delivery-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })

      const destinationIcon = L.divIcon({
        html: `<div style="background: #dc2626; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>`,
        className: "custom-destination-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })

      // Initial positions
      const deliveryPartnerLocation = [28.238, 83.9956]
      const customerLocation = [28.218, 83.9856]

      const marker = L.marker(deliveryPartnerLocation, { icon: deliveryIcon }).addTo(map)
      const destinationMarker = L.marker(customerLocation, { icon: destinationIcon }).addTo(map)

      // Fit map to show both markers
      const group = new L.featureGroup([marker, destinationMarker])
      map.fitBounds(group.getBounds().pad(0.1))

      // Function to animate marker movement
      const animateMarkerTo = (marker: any, targetLat: number, targetLng: number, duration = 3000) => {
        const startLat = marker.getLatLng().lat
        const startLng = marker.getLatLng().lng
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)

          // Easing function for smooth animation
          const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

          const easedProgress = easeInOutQuad(progress)

          const currentLat = startLat + (targetLat - startLat) * easedProgress
          const currentLng = startLng + (targetLng - startLng) * easedProgress

          marker.setLatLng([currentLat, currentLng])

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        animate()
      }

      // Start automatic movement towards destination after 2 seconds
      setTimeout(() => {
        animateMarkerTo(marker, customerLocation[0], customerLocation[1], 5000)
      }, 2000)

      // Add click handler for new destinations
      map.on("click", (e: any) => {
        // Move destination marker to clicked location
        destinationMarker.setLatLng([e.latlng.lat, e.latlng.lng])

        // Animate delivery marker to new destination
        animateMarkerTo(marker, e.latlng.lat, e.latlng.lng, 3000)

        // Fit map to show both markers after a slight delay to allow marker repositioning
        setTimeout(() => {
          const group = new L.featureGroup([marker, destinationMarker])
          map.fitBounds(group.getBounds().pad(0.1))
        }, 100)
      })
    }

    loadLeaflet()

    // Cleanup function to remove map when component unmounts
    return () => {
      const mapElement = document.getElementById("map")
      if (mapElement) {
        mapElement.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-500">Attos</h1>
            <p className="text-sm text-gray-600">Order #AT-2024-001</p>
          </div>
        </div>
      </header>

      {/* Map Section - Top Half */}
      <div className="h-[50vh] relative">
        <div id="map" className="w-full h-full"></div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              Out for Delivery
            </div>
          </Badge>
        </div>

        {/* ETA Card */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Arriving in 12-15 mins</p>
                    <p className="text-sm text-gray-600">Expected by 2:30 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-semibold">1.2 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <div className="p-4 space-y-4">
        {/* Delivery Partner */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Delivery Partner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=48&width=48&text=👨‍🚚+Rajesh"
                    alt="Delivery Partner"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Delivery Executive</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.8)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Items */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=🥔+Potato"
                  alt="Fresh Potato"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Fresh Potato</p>
                  <p className="text-sm text-gray-600">1 kg</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹40</p>
                  <p className="text-sm text-gray-600">Qty: 2</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=🍅+Tomato"
                  alt="Organic Tomato"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Organic Tomato</p>
                  <p className="text-sm text-gray-600">500g</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹35</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=🍚+Rice"
                  alt="Basmati Rice"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Basmati Rice</p>
                  <p className="text-sm text-gray-600">5 kg</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹120</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal (4 items)</span>
                <span>₹195</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹15</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹10</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹200</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-gray-600">Cash on Delivery</p>
                </div>
                <Badge variant="secondary">COD</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Home</p>
                <p className="text-sm text-gray-600">
                  123, Green Valley Apartments,
                  <br />
                  Sector 15, Gurgaon, Haryana - 122001
                </p>
                <p className="text-sm text-gray-600 mt-1">Contact: +91 98765 43210</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
<<<<<<< HEAD:frontend-service/app/components/delivery-status-user.js
export default Component;
=======
>>>>>>> e268f61 (___):frontend-service/app/delivery-status/page.tsx
