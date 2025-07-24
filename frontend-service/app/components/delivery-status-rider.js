"use client"

import { useEffect } from "react"
import { ArrowLeft, Clock, MapPin, Phone, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Load CSS
      const cssLink = document.createElement("link")
      cssLink.rel = "stylesheet"
      cssLink.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      document.head.appendChild(cssLink)

      const routingCssLink = document.createElement("link")
      routingCssLink.rel = "stylesheet"
      routingCssLink.href = "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css"
      document.head.appendChild(routingCssLink)

      // Load JS
      const leafletScript = document.createElement("script")
      leafletScript.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
      leafletScript.onload = () => {
        const routingScript = document.createElement("script")
        routingScript.src = "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"
        routingScript.onload = initializeMap
        document.head.appendChild(routingScript)
      }
      document.head.appendChild(leafletScript)
    }

    const initializeMap = () => {
      const L = window.L

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

      const marker = L.marker([28.238, 83.9956], { icon: deliveryIcon }).addTo(map)

      // Add destination marker (customer location)
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

      // Add customer destination
      const destinationMarker = L.marker([28.218, 83.9856], { icon: destinationIcon }).addTo(map)

      // Create route
      L.Routing.control({
        waypoints: [
          L.latLng(28.238, 83.9956), // Delivery partner location
          L.latLng(28.218, 83.9856), // Customer location
        ],
        routeWhileDragging: false,
        createMarker: () => null, // Don't create default markers
        lineOptions: {
          styles: [{ color: "#16a34a", weight: 4, opacity: 0.8 }],
        },
      })
        .on("routesfound", (e) => {
          const routes = e.routes
          console.log(routes)

          // Animate delivery partner movement along route
          let index = 0
          const animateDelivery = () => {
            if (index < routes[0].coordinates.length) {
              const coord = routes[0].coordinates[index]
              marker.setLatLng([coord.lat, coord.lng])
              index++
              setTimeout(animateDelivery, 200) // Move every 200ms
            }
          }

          // Start animation after 2 seconds
          setTimeout(animateDelivery, 2000)
        })
        .addTo(map)

      // Add click handler for new destinations
      map.on("click", (e) => {
        // Remove existing destination marker
        map.removeLayer(destinationMarker)

        // Add new destination marker
        const newDestinationMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: destinationIcon }).addTo(map)

        // Create new route
        L.Routing.control({
          waypoints: [L.latLng(28.238, 83.9956), L.latLng(e.latlng.lat, e.latlng.lng)],
          routeWhileDragging: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: "#16a34a", weight: 4, opacity: 0.8 }],
          },
        })
          .on("routesfound", (e) => {
            const routes = e.routes
            console.log(routes)
            e.routes[0].coordinates.forEach((coord, index) => {
              setTimeout(() => {
                marker.setLatLng([coord.lat, coord.lng])
              }, 100 * index)
            })
          })
          .addTo(map)
      })
    }

    loadLeaflet()

    // Cleanup function
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
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-green-600">Attos</h1>
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
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
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
                  src="/placeholder.svg?height=50&width=50"
                  alt="Amul Fresh Milk"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Amul Fresh Milk</p>
                  <p className="text-sm text-gray-600">1L Pack</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹62</p>
                  <p className="text-sm text-gray-600">Qty: 2</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Britannia Bread"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Britannia Bread</p>
                  <p className="text-sm text-gray-600">400g Pack</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹28</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Fresh Bananas"
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Fresh Bananas</p>
                  <p className="text-sm text-gray-600">1 Dozen</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹48</p>
                  <p className="text-sm text-gray-600">Qty: 1</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal (4 items)</span>
                <span>₹200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹15</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Platform Fee</span>
                <span>₹5</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹195</span>
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