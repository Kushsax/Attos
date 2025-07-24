"use client"

import type React from "react"

import { useState } from "react"
import { Star, Heart, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  price: { current: number }
  reviews: { rating: number; count: number }
  inStock: boolean
  images?: { src: string; alt: string }[]
  brand?: string
  specifications?: { label: string; value: string }[]
}

interface ProductCardProps {
  product: Product
  onClick?: () => void
}

function Stars({ value = 0, max = 5 }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${rounded >= i + 1 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { dispatch } = useCart()
  const isOutOfStock = !product.inStock

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOutOfStock || isAdding) return

    setIsAdding(true)
    dispatch({ type: "ADD_ITEM", payload: product })

    // Add a small delay for visual feedback
    setTimeout(() => {
      setIsAdding(false)
    }, 300)
  }

  return (
    <div
      className="group relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.03]"
      role="listitem"
      aria-label={`Product: ${product.name}, Price: ₹${product.price.current}`}
      onClick={onClick}
    >
      <div className="bg-white p-3 rounded-xl border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full w-full">
        {/* Image */}
        <div className="h-40 bg-blue-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
          {product.images?.[0]?.src ? (
            <img
              src={product.images[0].src || "/placeholder.svg"}
              alt={product.images[0].alt}
              className="object-contain h-full w-full"
              loading="lazy"
              draggable="false"
            />
          ) : (
            <span className="text-3xl text-blue-300">📦</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-xl shadow-sm hover:bg-white transition-all"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
            />
          </button>
        </div>

        {/* Name */}
        <h3 className="font-medium text-sm mb-1 text-gray-800 line-clamp-2 truncate">
          {product.name}
          {isOutOfStock && <span className="ml-2 text-xs text-red-600 font-medium">Out of Stock</span>}
        </h3>

        {/* Stars & Reviews */}
        <div className="flex items-center mb-1">
          <Stars value={product.reviews?.rating || 0} />
          <span className="ml-2 text-xs text-blue-600">{product.reviews?.count || 0} reviews</span>
        </div>

        {/* Price */}
        <p className="text-blue-700 text-sm font-semibold mb-3">₹{product.price.current}</p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`mt-auto py-2 px-3 rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-1 ${
            isOutOfStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : isAdding
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isOutOfStock ? (
            "Sold Out"
          ) : isAdding ? (
            "Added!"
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add
            </>
          )}
        </button>
      </div>
    </div>
  )
}
