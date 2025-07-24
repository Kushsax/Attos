import React from "react";

function Stars({ value = 0, max = 5 }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xs">
          {rounded >= i + 1 ? "★" : rounded >= i + 0.5 ? "☆" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full w-full">
      {/* Image */}
      <div className="h-40 bg-blue-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-contain h-full w-full"
            loading="lazy"
            draggable="false"
          />
        ) : (
          <span className="text-3xl text-blue-300">📦</span>
        )}
      </div>
      {/* Name */}
      <h3 className="font-medium text-sm mb-1 text-gray-800 line-clamp-2 truncate">
        {product.name}
      </h3>
      {/* Stars & Reviews */}
      <div className="flex items-center mb-1">
        <Stars value={product.rating || 0} />
        <span className="ml-2 text-xs text-blue-600">
          {product.reviews || 0} reviews
        </span>
      </div>
      {/* Price */}
      <p className="text-blue-700 text-sm font-semibold mb-3">
        {product.price}
      </p>
      {/* Add to Cart */}
      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm shadow-sm transition">
        Add to Cart
      </button>
    </div>
  );
}
