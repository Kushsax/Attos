"use client"

import { useState } from "react"
import { Star, Heart, Plus, Minus } from "lucide-react"
import { useCart } from "../hooks/use-cart"

export function ProductCard({ product, onProductClick }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { cartItems, addToCart, updateQuantity } = useCart()

  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 0
  const isOutOfStock = !product.inStock

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!isOutOfStock) {
      addToCart(product)
    }
  }

  const handleIncrement = (e) => {
    e.stopPropagation()
    if (quantity === 0) {
      addToCart(product)
    } else {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const handleDecrement = (e) => {
    e.stopPropagation()
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1)
    }
  }

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product)
    }
  }

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
          />
        </button>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{product.name}</h3>
          {product.unit && <p className="text-xs text-gray-500">{product.unit}</p>}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button / Quantity Controls */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-4 text-sm font-semibold rounded-xl transition-all ${
              isOutOfStock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm hover:shadow-md"
            }`}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-1">
            <button onClick={handleDecrement} className="p-1 text-white hover:bg-white/20 rounded-lg transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white font-semibold px-3">{quantity}</span>
            <button onClick={handleIncrement} className="p-1 text-white hover:bg-white/20 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
