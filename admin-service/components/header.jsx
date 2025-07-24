"use client"

import { useState } from "react"
import { Search, ShoppingCart, User, MapPin, Menu, X, Package, ArrowLeft } from "lucide-react"
import { useCart } from "../hooks/use-cart"

export function Header({ searchTerm, setSearchTerm, onCartClick, onOrdersClick, showBackButton, onBackClick, title }) {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Location / Back Button */}
          <div className="flex items-center gap-3">
            {showBackButton ? (
              <button onClick={onBackClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
            )}

            <div className="hidden sm:block">
              {title ? (
                <h1 className="font-bold text-lg text-gray-900">{title}</h1>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Everything</p>
                  <h1 className="font-bold leading-5 text-gray-900">Under 10 Minutes</h1>
                </>
              )}
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, shown in menu */}
          {!showBackButton && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search groceries, fruits, snacks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder:text-gray-400 text-gray-800 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Location - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-2xl text-sm text-gray-700">
            <MapPin className="text-indigo-500 w-4 h-4" />
            <span>Mumbai, India</span>
          </div>

          {/* Cart, Orders & User */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={onOrdersClick}
              className="hidden sm:flex p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors"
            >
              <Package className="w-5 h-5 text-gray-700" />
            </button>

            <button className="hidden sm:flex p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {!showBackButton && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search groceries, fruits, snacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder:text-gray-400 text-gray-800 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-indigo-500 w-4 h-4" />
              <span className="text-sm text-gray-700">Mumbai, India</span>
            </div>
            <button
              onClick={onOrdersClick}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <User className="w-4 h-4" />
              <span>My Account</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
