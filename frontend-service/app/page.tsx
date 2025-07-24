"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  TrendingUp,
  Phone,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import ProductCard from "@/components/product-card"
import { products } from "@/data/products"
import { useCart } from "@/contexts/cart-context"

const CATEGORIES = [
  {
    name: "Fruits & Vegetables",
    icon: "🥕",
    color: "from-green-500 to-emerald-500",
    key: "Fruits & Vegetables",
  },
  {
    name: "Dairy & Eggs",
    icon: "🥛",
    color: "from-blue-500 to-cyan-500",
    key: "Dairy & Eggs",
  },
  {
    name: "Snacks",
    icon: "🍿",
    color: "from-orange-500 to-red-500",
    key: "Snacks",
  },
  {
    name: "Beverages",
    icon: "🥤",
    color: "from-purple-500 to-pink-500",
    key: "Beverages",
  },
  {
    name: "Personal Care",
    icon: "🧴",
    color: "from-teal-500 to-green-500",
    key: "Personal Care",
  },
  {
    name: "Household",
    icon: "🧽",
    color: "from-indigo-500 to-purple-500",
    key: "Household",
  },
  {
    name: "Bakery",
    icon: "🍞",
    color: "from-yellow-500 to-orange-500",
    key: "Bakery",
  },
  {
    name: "Health",
    icon: "💊",
    color: "from-pink-500 to-rose-500",
    key: "Health",
  },
]

function CategoryCard({ category, onClick, isActive }: { category: any; onClick: () => void; isActive: boolean }) {
  return (
    <div
      className={`group cursor-pointer flex-shrink-0 ${isActive ? "ring-2 ring-blue-500" : ""}`}
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className={`relative p-6 w-36 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-xl border transition-all ${
          isActive ? "bg-blue-100 border-blue-300" : "bg-white/20 border-white/30 hover:bg-white/30"
        }`}
      >
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all mx-auto`}
        >
          {category.icon}
        </div>
        <h4 className="font-medium text-gray-800 text-sm text-center leading-tight">{category.name}</h4>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState("Mumbai, India")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const router = useRouter()
  const { state } = useCart()

  // Filter products by search term and category
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category.main === selectedCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.main.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory])

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleCategoryClick = (categoryKey: string) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null) // Deselect if already selected
    } else {
      setSelectedCategory(categoryKey)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo & Location */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-blue-500 font-bold text-3xl">Attos</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Everything</p>
                <h1 className="font-bold leading-5">Under 20 Minutes</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 min-w-60 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search groceries, fruits, snacks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder:text-gray-400 text-gray-800 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-2xl text-sm text-gray-700">
              <MapPin className="text-indigo-500" />
              <span>{currentLocation}</span>
            </div>

            {/* Cart & User */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/cart")}
                className="relative p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </button>
              <button
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors"
                aria-label="User"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-lg">
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-lg" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 px-3 py-1 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium w-max">
              <TrendingUp />
              <span>Super Fast Delivery</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Groceries in
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                10 Minutes
              </span>
            </h2>
            <p className="text-white/90 mb-6 max-w-lg text-lg">
              Fresh groceries, snacks & essentials delivered to your doorstep in minutes!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all">
                Start Shopping
              </button>
              <button className="px-8 py-3 bg-transparent text-white font-medium rounded-2xl border-2 border-white/20 hover:border-white/30 transition-colors">
                Browse Offers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h3>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-sm"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {CATEGORIES.map((category, i) => (
              <CategoryCard
                key={i}
                category={category}
                onClick={() => handleCategoryClick(category.key)}
                isActive={selectedCategory === category.key}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {selectedCategory
              ? `${selectedCategory} (${filteredProducts.length})`
              : searchTerm
                ? `Results for "${searchTerm}" (${filteredProducts.length})`
                : `All Products (${filteredProducts.length})`}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">
                {selectedCategory
                  ? `No products found in ${selectedCategory} category.`
                  : searchTerm
                    ? "Sorry, no products match your search."
                    : "No products available."}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                }}
                className="mt-3 px-6 py-2 bg-indigo-100 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-200 transition-colors"
              >
                {selectedCategory ? "Clear Filter" : "Clear Search"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Deals */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative flex flex-col gap-2">
              <span className="font-semibold text-white/95">FLASH SALE</span>
              <h3 className="text-2xl font-bold text-white mb-2">50% Off Fruits</h3>
              <p className="text-white/80 mb-4">Limited time only!</p>
              <button
                onClick={() => handleCategoryClick("Fruits & Vegetables")}
                className="w-max px-4 py-2 bg-white text-orange-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative flex flex-col gap-2">
              <span className="font-semibold text-white/95">FREE DELIVERY</span>
              <h3 className="text-2xl font-bold text-white mb-2">Orders above ₹199</h3>
              <p className="text-white/80 mb-4">Shop more, save more!</p>
              <button className="w-max px-4 py-2 bg-white text-emerald-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-lg border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-bold text-lg text-gray-900">Attos</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                India's fastest grocery delivery app. Fresh groceries in 10 minutes.
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-indigo-100 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-pink-100 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-blue-100 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Get Help</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4" />
                  help@attos.com
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 9999999999
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Clock className="w-4 h-4" />
                  24/7 Support
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Offers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Download App</h4>
              <div className="space-y-3">
                <button className="w-full p-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Download for iOS
                </button>
                <button className="w-full p-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Download for Android
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Attos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
