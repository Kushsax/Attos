"use client"

import { useState, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Star,
  Heart,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

// ========== DATA & TYPES ==========
const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 129,
    category: "Fruits & Veggies",
    rating: 4.5,
    reviews: 120,
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Milk",
    price: 79,
    category: "Dairy & Eggs",
    rating: 4.8,
    reviews: 95,
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Tea",
    price: 199,
    category: "Beverages",
    rating: 4.3,
    reviews: 83,
    inStock: true,
  },
  {
    id: 4,
    name: "Whole Wheat Bread",
    price: 49,
    category: "Bakery",
    rating: 4.2,
    reviews: 75,
    inStock: true,
  },
  {
    id: 5,
    name: "Healthy Snacks",
    price: 99,
    category: "Snacks",
    rating: 4.7,
    reviews: 112,
    inStock: true,
  },
  {
    id: 6,
    name: "Toilet Paper",
    price: 99,
    category: "Personal Care",
    rating: 4.1,
    reviews: 67,
    inStock: false,
  },
  {
    id: 7,
    name: "Natural Honey",
    price: 299,
    category: "Grocery",
    rating: 4.9,
    reviews: 134,
    inStock: true,
  },
  {
    id: 8,
    name: "Yogurt",
    price: 69,
    category: "Dairy & Eggs",
    rating: 4.4,
    reviews: 78,
    inStock: true,
  },
]

const CATEGORIES = [
  {
    name: "Fruits & Veggies",
    icon: "🥕",
    color: "from-green-500 to-emerald-500",
  },
  { name: "Dairy & Eggs", icon: "🥛", color: "from-blue-500 to-cyan-500" },
  { name: "Snacks", icon: "🍿", color: "from-orange-500 to-red-500" },
  { name: "Beverages", icon: "🥤", color: "from-purple-500 to-pink-500" },
  { name: "Personal Care", icon: "🧴", color: "from-teal-500 to-green-500" },
  { name: "Household", icon: "🧽", color: "from-indigo-500 to-purple-500" },
  { name: "Bakery", icon: "🍞", color: "from-yellow-500 to-orange-500" },
  { name: "Health", icon: "💊", color: "from-pink-500 to-rose-500" },
]

// ========== COMPONENTS ==========
function ProductCard({ product, onAddToCart }: { product: any; onAddToCart: (product: any) => void }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const isOutOfStock = !product.inStock

  return (
    <div
      className="group relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.03]"
      role="listitem"
      aria-label={`Product: ${product.name}, Price: ₹${product.price}`}
    >
      <div
        className={`relative rounded-3xl p-4 shadow-md bg-white/90 backdrop-blur-sm border border-white/30 ${
          isOutOfStock ? "opacity-70" : ""
        }`}
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 flex items-center justify-center">
          <span className="text-4xl opacity-30">{product.category === "Fruits & Veggies" ? "🍎" : "📦"}</span>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-xl shadow-sm hover:bg-white transition-all"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 text-sm leading-tight">
            {product.name}
            {isOutOfStock && <span className="ml-2 text-xs text-red-600 font-medium">Out of Stock</span>}
          </h4>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through ml-1">₹{product.price + 30}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
              disabled={isOutOfStock}
              className={`px-3 py-1.5 text-sm font-medium rounded-xl shadow-sm transition-all ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isOutOfStock ? "Sold Out" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: any }) {
  return (
    <div className="group cursor-pointer flex-shrink-0" tabIndex={0}>
      <div className="relative p-6 w-36 bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-xl border border-white/30 hover:bg-white/30 transition-all">
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

// ========== MAIN COMPONENT ==========
export default function GroceryApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cartCount, setCartCount] = useState(3)
  const [currentLocation, setCurrentLocation] = useState("Mumbai, India")
  const [products, setProducts] = useState(PRODUCTS)

  // Filter products by search term and category
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setProducts(filtered)
    } else {
      setProducts(PRODUCTS)
    }
  }, [searchTerm])

  const trendingItems = PRODUCTS.slice(0, 10)

  const addToCart = (product: any) => {
    setCartCount((prev) => prev + 1)
    // In a real app, you would add to a cart state/context
    // and show a toast notification
    console.log(`Added ${product.name} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      {/* === ANIMATED BACKGROUND === */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
            linear-gradient(-45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)
          `,
          backgroundSize: "60px 60px",
          mixBlendMode: "overlay",
        }}
      />

      {/* === HEADER === */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo & Location */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
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
                {/* Clear button */}
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
                className="relative p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
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

      {/* === HERO BANNER === */}
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

      {/* === CATEGORIES === */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h3>
          <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View All <ArrowRight />
          </button>
        </div>
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {CATEGORIES.map((category, i) => (
              <CategoryCard key={i} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* === TRENDING PRODUCTS === */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Trending Products</h3>
          <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View All <ArrowRight />
          </button>
        </div>
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {trendingItems.map((product) => (
              <div key={product.id} className="w-56">
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ALL PRODUCTS === */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" aria-live="polite">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">Sorry, no products match your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 px-6 py-2 bg-indigo-100 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-200 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* === DEALS / PROMO BANNERS === */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative flex flex-col gap-2">
              <span className="font-semibold text-white/95">FLASH SALE</span>
              <h3 className="text-2xl font-bold text-white mb-2">50% Off Fruits</h3>
              <p className="text-white/80 mb-4">Limited time only!</p>
              <button className="w-max px-4 py-2 bg-white text-orange-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all">
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

      {/* === FOOTER === */}
      <footer className="bg-white/90 backdrop-blur-lg border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
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
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Download App</h4>
              <div className="space-y-3">
                <button className="w-full p-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <span>Download for iOS</span>
                </button>
                <button className="w-full p-3 bg-gray-900 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <span>Download for Android</span>
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
