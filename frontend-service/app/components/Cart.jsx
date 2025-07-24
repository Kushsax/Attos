"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiClock,
  FiTag,
  FiShoppingBag,
  FiPlusCircle,
  FiMenu,
  FiShoppingCart,
  FiHome,
  FiUser,
  FiAward,
  FiDownload,
} from "react-icons/fi";

// Mock cart data
const mockCart = [
  {
    id: "1",
    name: "Fresh Potato",
    price: 20,
    quantity: 2,
    image: "/images/potato.jpg",
    supplier: "Farm Fresh",
    weight: "1 kg",
  },
  {
    id: "2",
    name: "Organic Tomato",
    price: 35,
    quantity: 1,
    image: "/images/tomato.jpg",
    supplier: "Organic Valley",
    weight: "500 gm",
  },
  {
    id: "3",
    name: "Basmati Rice",
    price: 120,
    quantity: 1,
    image: "/images/rice.jpg",
    supplier: "India Gate",
    weight: "5 kg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCart);
  const [deliveryTime] = useState("10");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const promoInputRef = useRef();

  // PWA install prompt logic
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      });
    }
  };

  // Responsive cart logic
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 15;
  const tax = subtotal * 0.05;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const incrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    if (promoCode.toUpperCase() === "ASTO10") {
      setAppliedPromo(promoCode);
      setPromoApplied(true);
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const animateCart = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.1 } },
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 max-w-2xl mx-auto bg-slate-50">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <FiShoppingBag className="text-4xl text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center text-slate-900">
          Your Cart Is Empty
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Your shopping cart is feeling lonely. Let’s fill it with the freshest groceries!
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 mb-6"
        >
          Start Shopping
        </motion.button>

        {/* Install PWA Banner */}
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full max-w-[30rem] bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4"
          >
            <div className="flex items-center gap-3">
              <FiDownload className="text-blue-600 text-2xl" />
              <span className="font-medium text-blue-900">
                Install for a better experience
              </span>
            </div>
            <button
              onClick={handleInstallClick}
              className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Install Now
            </button>
          </motion.div>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen flex flex-col">
      {/* Install Prompt */}
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 w-full bg-blue-50 border border-blue-100 rounded-xl p-3 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4"
        >
          <div className="flex items-center gap-3">
            <FiDownload className="text-blue-600 text-xl md:text-2xl" />
            <span className="font-medium text-blue-900">
              Install for a better experience
            </span>
          </div>
          <button
            onClick={handleInstallClick}
            className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Install Now
          </button>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          My Cart
          <span className="ml-2 text-2xl font-medium text-blue-600">({cartItems.length})</span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full text-blue-900 text-sm font-medium">
            <FiClock className="inline" /> Delivery in ~{deliveryTime} min
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <motion.div layout className="flex-1 flex flex-col gap-4 mb-6">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={animateCart}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ y: -2 }}
              className="flex items-stretch justify-between bg-white rounded-xl shadow-sm p-3 xs:p-4 border border-slate-100 max-w-[100vw] overflow-hidden"
            >
              <div className="flex flex-1 items-stretch gap-3 overflow-hidden">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-50 rounded-xl shadow-sm overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <span className="text-xs font-medium text-slate-400">Image</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-slate-500 truncate">
                    {item.supplier} • {item.weight}
                  </p>
                  <p className="font-semibold text-blue-600">₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 xs:gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => decrementQuantity(item.id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 active:bg-slate-100"
                >
                  <FiMinus size={14} />
                </motion.button>
                <motion.span
                  key={item.quantity}
                  initial={{ y: 10, opacity: 0.8 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-6 text-center font-medium text-sm"
                >
                  {item.quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => incrementQuantity(item.id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 active:bg-slate-100"
                >
                  <FiPlus size={14} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeItem(item.id)}
                  className="ml-2 p-1.5 rounded-full hover:bg-red-50 active:bg-red-100 text-slate-400 hover:text-red-500"
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Promo Code */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.15 } }}
        className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 mb-6 mx-4 xs:mx-0"
      >
        <div className="flex items-center mb-2">
          <FiTag className="text-gray-500 mr-2" />
          <span className="font-medium text-slate-800">Promo Code</span>
        </div>
        <div className="flex">
          <input
            ref={promoInputRef}
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError(null);
            }}
            
            className="flex-1 px-3 xs:px-4 py-2 xs:py-3 border border-slate-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <motion.button
            whileHover={{ backgroundColor: "#1d4ed8" }}
            whileTap={{ scale: 0.98 }}
            onClick={applyPromoCode}
            className="px-3 xs:px-4 py-2 xs:py-3 bg-blue-600 text-white font-medium rounded-r-xl shadow-sm"
          >
            Apply
          </motion.button>
        </div>
        <AnimatePresence>
          {promoError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-xs xs:text-sm text-red-500"
            >
              {promoError}
            </motion.p>
          )}
          {appliedPromo && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-xs xs:text-sm text-emerald-600"
            >
              Promo "{appliedPromo}" applied! 10% off on the total.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bill Details */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        className="bg-white rounded-xl shadow-sm p-4 border border-slate-100 mx-4 xs:mx-0 mb-6"
      >
        <h3 className="font-medium text-slate-800 mb-3">Bill Details</h3>
        <div className="flex justify-between py-1">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1 text-slate-600 text-xs xs:text-sm">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1 text-slate-600 text-xs xs:text-sm">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        {promoApplied && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between py-1 text-emerald-600 font-medium text-xs xs:text-sm"
          >
            <span>Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </motion.div>
        )}
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-slate-200">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </motion.div>

      {/* Checkout */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-[calc(100%-2rem)] xs:w-full max-w-[30rem] mx-auto mb-4 py-3 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Place Order
      </motion.button>

      
    </main>
  );
}
