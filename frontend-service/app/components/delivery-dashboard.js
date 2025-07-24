"use client";

import { useState } from "react";
import { Clock, MapPin, Package, DollarSign, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import mockOrders from "@/data/orders";

function DeliveryDashboard() {
  // Initializing state directly with mockOrders ensures consistent rendering
  // between the server (SSR) and the client (hydration).
  const [orders, setOrders] = useState(mockOrders);

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    // In a real app, this would also involve an API call to update the order status.
  };

  const handleDeclineOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    // Similarly, a real application would make an API call here to decline the order.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-seriff text-blue-500">Attos</h1>
            <p className="text-sm text-gray-600">Delivery Partner</p>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {orders.length} Pending
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
            <p className="text-gray-600">New orders will appear here when available.</p>
          </div>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Order {order.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{order.estimatedTime}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {order.customerPhone}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <MapPin className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pickup from</p>
                      <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <MapPin className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Deliver to</p>
                      <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="text-sm font-medium">{order.items.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="text-sm font-medium">{order.distance}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Order Value</span>
                    <span className="text-sm font-medium">Rs.{order.orderValue.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      
                      Your Earnings
                    </span>
                    <span className="text-lg font-bold text-green-600">Rs.{order.deliveryFee.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                    onClick={() => handleDeclineOrder(order.id)}
                  >
                    Decline
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    Accept Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
export default DeliveryDashboard;