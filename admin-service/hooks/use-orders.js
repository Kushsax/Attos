"use client"

import { useState, useEffect } from "react"

export function useOrders() {
  const [orders, setOrders] = useState([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: "confirmed",
      deliveryStage: "order_placed",
      estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (orderId, status, deliveryStage) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status, deliveryStage } : order)))
  }

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === Number.parseInt(orderId))
  }

  return {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
  }
}
