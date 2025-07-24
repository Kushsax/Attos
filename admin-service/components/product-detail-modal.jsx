"use client"

import { useState } from "react"
import { X, Star, Heart, Plus, Minus } from "lucide-react"
import { useCart } from "../hooks/use-cart"

export function ProductDetailModal({ product, isOpen, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { cartItems, addToCart, updateQuantity } = useCart()

  if (!isOpen || !product) return null

  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 0
  const isOutOfStock = !product.inStock

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product)
    }
  }

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(product)
    } else {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-3xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
              />
            </button>
            {product.originalPrice && (
              <div className="absolute bottom-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              {product.unit && <p className="text-gray-500">{product.unit}</p>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all ${
                    isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              ) : (
                <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-2">
                  <button
                    onClick={handleDecrement}
                    className="p-3 text-white hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-white font-bold text-xl px-4">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-3 text-white hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
