"use client"

import { useState, useEffect } from "react"
import { Package, Clock, CheckCircle, Truck, MapPin } from "lucide-react"
import { useOrders } from "../hooks/use-orders"
import { useGeolocation } from "../hooks/use-geolocation"
import { DeliveryMap } from "./delivery-map"

export function OrdersPage({ onBack }) {
  const { orders, updateOrderStatus } = useOrders()
  const { location } = useGeolocation()
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Simulate order status updates
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order) => {
        if (order.deliveryStage === "order_placed") {
          setTimeout(() => updateOrderStatus(order.id, "confirmed", "preparing"), 5000)
        } else if (order.deliveryStage === "preparing") {
          setTimeout(() => updateOrderStatus(order.id, "confirmed", "picked_up"), 10000)
        } else if (order.deliveryStage === "picked_up") {
          setTimeout(() => updateOrderStatus(order.id, "out_for_delivery", "on_the_way"), 15000)
        } else if (order.deliveryStage === "on_the_way") {
          setTimeout(() => updateOrderStatus(order.id, "delivered", "delivered"), 30000)
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [orders, updateOrderStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-blue-600 bg-blue-100"
      case "out_for_delivery":
        return "text-orange-600 bg-orange-100"
      case "delivered":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getDeliveryStageIcon = (stage) => {
    switch (stage) {
      case "order_placed":
        return <Package className="w-4 h-4" />
      case "preparing":
        return <Clock className="w-4 h-4" />
      case "picked_up":
        return <Truck className="w-4 h-4" />
      case "on_the_way":
        return <MapPin className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Orders
          </button>

          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h1>
                  <p className="text-gray-500">Placed on {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.replace("_", " ").toUpperCase()}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                  <p className="text-gray-600">{selectedOrder.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                  <p className="text-gray-600 capitalize">{selectedOrder.paymentMethod.replace("_", " ")}</p>
                </div>
              </div>
            </div>

            {/* Live Tracking */}
            {selectedOrder.status !== "delivered" && <DeliveryMap order={selectedOrder} userLocation={location} />}

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace("_", " ").toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    {getDeliveryStageIcon(order.deliveryStage)}
                    <span className="text-sm capitalize">{order.deliveryStage.replace("_", " ")}</span>
                  </div>
                  {order.status !== "delivered" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        ETA:{" "}
                        {new Date(order.estimatedDelivery).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                    <p className="text-sm text-gray-500 capitalize">{order.paymentMethod.replace("_", " ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
