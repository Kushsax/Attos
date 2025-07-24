"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  MapPin,
  Phone,
  Wallet,
  CheckCircle,
  Package,
  Navigation,
  Star,
  Timer,
  Bike,
  Bell,
  TrendingUp,
  Route,
  Zap,
} from "lucide-react"

export default function RiderDashboard() {
  const [currentOrder, setCurrentOrder] = useState(null)
  const [orderStatus, setOrderStatus] = useState("pending")
  const [walletBalance, setWalletBalance] = useState(2850.75)
  const [todayEarnings, setTodayEarnings] = useState(485.5)
  const [timer, setTimer] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [completedOrders, setCompletedOrders] = useState(15)

  const incomingOrder = {
    id: "QC-2024-1247",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    pickupAddress: "BigBasket Store, Sector 18, Noida",
    deliveryAddress: "Tower B-402, Lotus Boulevard, Sector 100, Noida",
    items: 12,
    amount: 1247.8,
    distance: "3.2 km",
    estimatedTime: 28,
    deliveryFee: 45.0,
    orderTime: "2:45 PM",
  }

  useEffect(() => {
    let interval
    if (orderStatus === "accepted" || orderStatus === "pickup") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [orderStatus])

  const handleAcceptOrder = () => {
    setCurrentOrder(incomingOrder)
    setOrderStatus("accepted")
    setTimer(0)
  }

  const handlePickup = () => {
    setOrderStatus("pickup")
    setTimer(0)
  }

  const handleDelivered = () => {
    setOrderStatus("delivered")
    const earnings = incomingOrder.deliveryFee
    setWalletBalance((prev) => prev + earnings)
    setTodayEarnings((prev) => prev + earnings)
    setCompletedOrders((prev) => prev + 1)

    // Reset after 3 seconds
    setTimeout(() => {
      setCurrentOrder(null)
      setOrderStatus("pending")
      setTimer(0)
    }, 3000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressValue = () => {
    switch (orderStatus) {
      case "accepted":
        return 33
      case "pickup":
        return 66
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-blue-200">
                <AvatarImage src="/placeholder.svg?height=56&width=56" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold">
                  RK
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rahul Kumar</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">4.9</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  <Bike className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOnline(!isOnline)}>
            <Bell className="h-5 w-5 text-blue-600" />
            {orderStatus === "pending" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </Button>
        </div>

        {/* Wallet Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                <span className="text-lg font-semibold">Wallet Balance</span>
              </div>
              <Zap className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Available Balance</span>
                <span className="text-3xl font-bold">₹{walletBalance.toFixed(2)}</span>
              </div>
              <Separator className="bg-blue-400" />
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Today's Earnings</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-xl font-semibold text-green-300">+₹{todayEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Package className="h-5 w-5 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
                <p className="text-xs text-gray-600">Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Route className="h-5 w-5 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">47.2</p>
                <p className="text-xs text-gray-600">KM</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Timer className="h-5 w-5 text-purple-600" />
                <p className="text-2xl font-bold text-gray-900">6.2</p>
                <p className="text-xs text-gray-600">Hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status or Incoming Order */}
        {orderStatus === "pending" ? (
          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-bold">New Order Available!</h3>
                  <p className="text-green-100 text-sm">#{incomingOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{incomingOrder.deliveryFee}</p>
                  <p className="text-green-100 text-sm">Delivery Fee</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{incomingOrder.items} items</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
                  ₹{incomingOrder.amount}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Pickup Location</p>
                    <p className="text-gray-700 text-sm">{incomingOrder.pickupAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Navigation className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Delivery Address</p>
                    <p className="text-gray-700 text-sm">{incomingOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">ETA: {incomingOrder.estimatedTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">{incomingOrder.distance}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                <Phone className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-semibold text-gray-900">{incomingOrder.customerName}</p>
                  <p className="text-gray-600 text-sm">{incomingOrder.customerPhone}</p>
                </div>
              </div>

              <Button
                onClick={handleAcceptOrder}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg"
              >
                Accept Order - ₹{incomingOrder.deliveryFee}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-bold">Active Order</h3>
                  <p className="text-blue-100 text-sm">#{currentOrder?.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{formatTime(timer)}</p>
                  <p className="text-blue-100 text-sm">Timer</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Order Progress</span>
                  <span>{getProgressValue()}%</span>
                </div>
                <Progress value={getProgressValue()} className="h-2" />
              </div>

              {/* Status Steps */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      orderStatus === "accepted" || orderStatus === "pickup" || orderStatus === "delivered"
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2 font-medium">Accepted</span>
                </div>

                <div
                  className={`flex-1 h-1 mx-3 ${
                    orderStatus === "pickup" || orderStatus === "delivered" ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      orderStatus === "pickup" || orderStatus === "delivered"
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2 font-medium">Pickup</span>
                </div>

                <div className={`flex-1 h-1 mx-3 ${orderStatus === "delivered" ? "bg-green-600" : "bg-gray-200"}`} />

                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      orderStatus === "delivered"
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2 font-medium">Delivered</span>
                </div>
              </div>

              <Separator />

              {/* Address Information */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {orderStatus === "accepted" ? "Go to Pickup:" : "Pickup Location"}
                    </p>
                    <p className="text-gray-700 text-sm">{currentOrder?.pickupAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Navigation className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Delivery Address</p>
                    <p className="text-gray-700 text-sm">{currentOrder?.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {orderStatus === "accepted" && (
                <Button
                  onClick={handlePickup}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                >
                  <Package className="h-5 w-5 mr-2" />
                  Confirm Pickup
                </Button>
              )}

              {orderStatus === "pickup" && (
                <Button
                  onClick={handleDelivered}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mark as Delivered
                </Button>
              )}

              {orderStatus === "delivered" && (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600 mb-1">Order Delivered!</p>
                    <p className="text-gray-600">Great job! Keep it up.</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-green-800 font-semibold">₹{currentOrder?.deliveryFee} added to wallet</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
