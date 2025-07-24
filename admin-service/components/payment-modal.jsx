"use client"

import { useState } from "react"
import { X, CreditCard, Banknote, Smartphone } from "lucide-react"

export function PaymentModal({ isOpen, onClose, onPaymentSelect, totalAmount }) {
  const [selectedMethod, setSelectedMethod] = useState("cod")

  if (!isOpen) return null

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when your order arrives",
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Pay using UPI apps",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay using your card",
    },
  ]

  const handleConfirmPayment = () => {
    onPaymentSelect(selectedMethod)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Choose Payment Method</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Payment Methods */}
          <div className="p-6 space-y-4">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <div
                  key={method.id}
                  className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${selectedMethod === method.id ? "bg-indigo-100" : "bg-gray-100"}`}>
                      <IconComponent
                        className={`w-6 h-6 ${selectedMethod === method.id ? "text-indigo-600" : "text-gray-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedMethod === method.id ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                      }`}
                    >
                      {selectedMethod === method.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">₹{totalAmount}</span>
            </div>
            <button
              onClick={handleConfirmPayment}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
