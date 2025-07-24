"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, Clock, Tag, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [deliveryTime] = useState("10")
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState<string | null>(null)

  const subtotal = state.totalPrice
  const deliveryFee = subtotal > 199 ? 0 : 15
  const tax = subtotal * 0.05
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + deliveryFee + tax - discount

  const incrementQuantity = (id: string, currentQuantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: currentQuantity + 1 } })
  }

  const decrementQuantity = (id: string, currentQuantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: Math.max(1, currentQuantity - 1) } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code")
      return
    }
    if (promoCode.toUpperCase() === "ATTOS10") {
      setAppliedPromo(promoCode)
      setPromoApplied(true)
      setPromoError(null)
    } else {
      setPromoError("Invalid promo code")
      setPromoApplied(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-blue-500">Attos</h1>
              <p className="text-sm text-gray-600">My Cart</p>
            </div>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="text-4xl text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center text-slate-900">Your Cart Is Empty</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Your shopping cart is feeling lonely. Let's fill it with the freshest groceries!
          </p>
          <Button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700"
          >
            Start Shopping
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-500">Attos</h1>
            <p className="text-sm text-gray-600">My Cart ({state.items.length})</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen flex flex-col">
        {/* Delivery Time */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Cart</h1>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full text-blue-900 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>Delivery in ~{deliveryTime} min</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4 mb-6">
          {state.items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">
                      {item.supplier} • {item.weight}
                    </p>
                    <p className="font-semibold text-blue-600">₹{item.price.current}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(item.id, item.quantity)}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(item.id, item.quantity)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Promo Code */}
        <Card className="p-4 mb-6">
          <div className="flex items-center mb-2">
            <Tag className="text-gray-500 mr-2" />
            <span className="font-medium text-slate-800">Promo Code</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value)
                setPromoError(null)
              }}
              placeholder="Enter promo code"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Button onClick={applyPromoCode} className="bg-blue-600 hover:bg-blue-700">
              Apply
            </Button>
          </div>
          {promoError && <p className="mt-2 text-sm text-red-500">{promoError}</p>}
          {appliedPromo && (
            <p className="mt-2 text-sm text-emerald-600">Promo "{appliedPromo}" applied! 10% off on the total.</p>
          )}
        </Card>

        {/* Bill Details */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium text-slate-800 mb-3">Bill Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-emerald-600 font-medium text-sm">
                <span>Discount</span>
                <span>- ₹{discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Checkout */}
        <Button
          className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700"
          onClick={() => router.push("/delivery-status")}
        >
          Place Order
        </Button>
      </main>
    </div>
  )
}
