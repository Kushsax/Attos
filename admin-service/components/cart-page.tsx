"use client"

import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, MapPin, Clock } from "lucide-react"
import { useCart } from "../hooks/use-cart"

interface CartPageProps {
  onBack: () => void
  onPlaceOrder: () => void
}

export function CartPage({ onBack, onPlaceOrder }: CartPageProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getSavings, getTotalItems } = useCart()

  const deliveryFee = getTotalPrice() >= 199 ? 0 : 29
  const finalTotal = getTotalPrice() + deliveryFee

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">My Cart</h1>
              <p className="text-sm text-gray-500">{getTotalItems()} items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Items in your cart</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Delivery in 10 mins</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                          {item.unit && <p className="text-sm text-gray-500 mb-2">{item.unit}</p>}
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                            )}
                            {item.originalPrice && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center bg-gray-100 rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 rounded-l-xl transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 rounded-r-xl transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Delivery Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Address</h3>
                    <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>Delivery in 8-10 minutes</span>
                </div>
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Bill Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">₹{getTotalPrice()}</span>
                  </div>
                  {getSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span>-₹{getSavings()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : "font-medium"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {getTotalPrice() < 199 && (
                    <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded-lg">
                      Add ₹{199 - getTotalPrice()} more for free delivery
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={onPlaceOrder}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Place Order • ₹{finalTotal}
              </button>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Methods</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>UPI / Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Digital Wallets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
