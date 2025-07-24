"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, Share2, ShoppingCart, Search, Menu, User, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/produts";
import { getIcon } from "@/utils/icons"; 

export default function ProductPage() {
  const product = products[1];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Location */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div> */}
                <span className="text-3xl font-bold font-seriff text-blue-500">Attos</span>
              </div>
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Delivery in {product.deliveryTime}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button size="sm" className="bg-blue-500 hover:bg-purple-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
              {/* <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button> */}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="text-sm text-gray-500">
          <span>Home</span> / <span>{product.category.main}</span> /{" "}
          <span>{product.category.sub}</span> /{" "}
          <span className="text-gray-900">{product.category.specific}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]?.src || "/placeholder.svg"}
                alt={product.images[selectedImage]?.alt || "Product Image"}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant={badge === "In Stock" ? "secondary" : "outline"}
                    className={badge === "In Stock" ? "bg-green-100 text-green-800" : ""}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(product.reviews.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews.average})
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews.count.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.current}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.price.original}
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {product.price.discount}% OFF
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {product.keyFeatures.map((feature, index) => {
                const IconComponent = getIcon(feature.icon); // getIcon function used here
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-500 hover:bg-purple-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Delivery</span>
                    <span className="text-sm text-green-600 font-medium">
                      {product.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Free delivery</span>
                    <span className="text-sm text-gray-600">
                      on orders above ₹{product.freeDeliveryThreshold}
                    </span>
                  </div>
                  <Separator />
                  <div className="text-xs text-gray-500">
                    Order within 2 hours for delivery today
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <div className="space-y-2 text-sm">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{spec.label}</span>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="space-y-2 text-sm">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}