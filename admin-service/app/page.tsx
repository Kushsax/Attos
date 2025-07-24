"use client";

import { useState } from "react"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Bell,
  Search,
  Plus,
  Minus,
  Edit3,
  Save,
  X,
  ShoppingCart,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data
const initialProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits",
    stock: 45,
    minStock: 20,
    price: 89.99,
    sku: "FRT001",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Whole Milk",
    category: "Dairy",
    stock: 8,
    minStock: 15,
    price: 65.49,
    sku: "DRY001",
    lastUpdated: "2024-01-15",
  },
  {
    id: 3,
    name: "Brown Bread",
    category: "Bakery",
    stock: 25,
    minStock: 10,
    price: 45.29,
    sku: "BKY001",
    lastUpdated: "2024-01-15",
  },
  {
    id: 4,
    name: "Chicken Breast",
    category: "Meat",
    stock: 12,
    minStock: 8,
    price: 299.99,
    sku: "MET001",
    lastUpdated: "2024-01-15",
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Vegetables",
    stock: 3,
    minStock: 12,
    price: 39.99,
    sku: "VEG001",
    lastUpdated: "2024-01-15",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    category: "Dairy",
    stock: 18,
    minStock: 10,
    price: 149.99,
    sku: "DRY002",
    lastUpdated: "2024-01-15",
  },
]

const recentOrders = [
  {
    id: "ORD001",
    items: [
      { productId: 1, quantity: 3 },
      { productId: 3, quantity: 2 },
    ],
    status: "completed",
    timestamp: "2024-01-15 14:30",
  },
  {
    id: "ORD002",
    items: [
      { productId: 2, quantity: 1 },
      { productId: 4, quantity: 1 },
    ],
    status: "processing",
    timestamp: "2024-01-15 14:25",
  },
  { id: "ORD003", items: [{ productId: 5, quantity: 2 }], status: "completed", timestamp: "2024-01-15 14:20" },
]

export default function ZeptoAdminDashboard() {
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(recentOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [editStock, setEditStock] = useState("")
  const [notifications, setNotifications] = useState<string[]>([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    sku: "",
  })

  // Smart inventory alerts
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock)
  const outOfStockProducts = products.filter((product) => product.stock === 0)

  // Process order and update inventory
  const processOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order || order.status === "completed") return

    const updatedProducts = [...products]
    const newNotifications = [...notifications]

    order.items.forEach((item) => {
      const productIndex = updatedProducts.findIndex((p) => p.id === item.productId)
      if (productIndex !== -1) {
        const product = updatedProducts[productIndex]
        const newStock = Math.max(0, product.stock - item.quantity)
        updatedProducts[productIndex] = {
          ...product,
          stock: newStock,
          lastUpdated: new Date().toISOString().split("T")[0],
        }

        if (newStock <= product.minStock) {
          newNotifications.push(`${product.name} is running low (${newStock} left)`)
        }
      }
    })

    setProducts(updatedProducts)
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o)))
    setNotifications(newNotifications.slice(-5)) // Keep last 5 notifications
  }

  // Update stock manually
  const updateStock = (productId: number, newStock: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, stock: Math.max(0, newStock), lastUpdated: new Date().toISOString().split("T")[0] }
          : product,
      ),
    )
    setEditingProduct(null)
    setEditStock("")
  }

  // Add new product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      return
    }

    const product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      minStock: Number.parseInt(newProduct.minStock) || 10,
      sku:
        newProduct.sku ||
        `${newProduct.category.substring(0, 3).toUpperCase()}${String(Math.max(...products.map((p) => p.id)) + 1).padStart(3, "0")}`,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      minStock: "",
      sku: "",
    })
    setShowAddProduct(false)
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map((p) => p.category))]
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.stock * product.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Attos Admin
              </h1>
              <p className="text-blue-600/70 font-medium">Smart Inventory Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {notifications.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="relative bg-white/50 border-blue-200 hover:bg-blue-50">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-gradient-to-r from-blue-500 to-blue-600 border-0">
                      {notifications.length}
                    </Badge>
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-blue-200">
                  <DialogHeader>
                    <DialogTitle className="text-blue-800">Inventory Alerts</DialogTitle>
                    <DialogDescription>Recent inventory notifications</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    {notifications.map((notification, index) => (
                      <Alert key={index} className="border-blue-200 bg-blue-50">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-700">{notification}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-blue-200">
                <DialogHeader>
                  <DialogTitle className="text-blue-800">Add New Product</DialogTitle>
                  <DialogDescription>Add a new product to your inventory</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-700">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-blue-700">
                        Category
                      </Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">+ Add New Category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-blue-700">
                        Price (₹)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock" className="text-blue-700">
                        Initial Stock
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minStock" className="text-blue-700">
                        Minimum Stock
                      </Label>
                      <Input
                        id="minStock"
                        type="number"
                        placeholder="10"
                        value={newProduct.minStock}
                        onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-blue-700">
                      SKU (Optional)
                    </Label>
                    <Input
                      id="sku"
                      placeholder="Auto-generated if empty"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowAddProduct(false)} className="border-blue-200">
                      Cancel
                    </Button>
                    <Button
                      onClick={addProduct}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      disabled={!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock}
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Products</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">{totalProducts}</div>
              <p className="text-xs text-blue-600 mt-1">Active inventory items</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Inventory Value</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                ₹{totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-green-600 mt-1">Total stock value</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Low Stock Items</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800">{lowStockProducts.length}</div>
              <p className="text-xs text-orange-600 mt-1">Need restocking</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Out of Stock</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <X className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800">{outOfStockProducts.length}</div>
              <p className="text-xs text-red-600 mt-1">Urgent attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        {lowStockProducts.length > 0 && (
          <Alert className="mb-8 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800 font-medium">
              <strong>{lowStockProducts.length} products</strong> are running low on stock:{" "}
              <span className="font-semibold">{lowStockProducts.map((p) => p.name).join(", ")}</span>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="inventory" className="space-y-8">
          <TabsList className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-lg">
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Inventory Management
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Order Processing
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Smart Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-blue-800">Inventory Management</CardTitle>
                <CardDescription className="text-blue-600">
                  Manage your store inventory and stock levels
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                    <Input
                      placeholder="Search products or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-blue-200 focus:border-blue-500 bg-white/50"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-blue-200 focus:border-blue-500 bg-white/50">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Products Table */}
                <div className="rounded-xl border-0 shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <TableHead className="text-white font-semibold">Product</TableHead>
                        <TableHead className="text-white font-semibold">SKU</TableHead>
                        <TableHead className="text-white font-semibold">Category</TableHead>
                        <TableHead className="text-white font-semibold">Price</TableHead>
                        <TableHead className="text-white font-semibold">Stock</TableHead>
                        <TableHead className="text-white font-semibold">Status</TableHead>
                        <TableHead className="text-white font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product, index) => (
                        <TableRow
                          key={product.id}
                          className={`hover:bg-blue-50/50 ${index % 2 === 0 ? "bg-white/30" : "bg-blue-50/20"}`}
                        >
                          <TableCell className="font-medium text-blue-900">{product.name}</TableCell>
                          <TableCell className="text-blue-600">{product.sku}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-green-700">
                            ₹{product.price.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            {editingProduct === product.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={editStock}
                                  onChange={(e) => setEditStock(e.target.value)}
                                  className="w-20 border-blue-200"
                                  min="0"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => updateStock(product.id, Number.parseInt(editStock))}
                                  disabled={!editStock}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingProduct(null)
                                    setEditStock("")
                                  }}
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-semibold ${product.stock <= product.minStock ? "text-orange-600" : "text-blue-800"}`}
                                >
                                  {product.stock}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingProduct(product.id)
                                    setEditStock(product.stock.toString())
                                  }}
                                  className="text-blue-600 hover:bg-blue-50"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.stock === 0 ? (
                              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                                Out of Stock
                              </Badge>
                            ) : product.stock <= product.minStock ? (
                              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                                Low Stock
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                                In Stock
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStock(product.id, product.stock - 1)}
                                disabled={product.stock === 0}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStock(product.id, product.stock + 1)}
                                className="border-green-200 text-green-600 hover:bg-green-50"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-blue-800">Order Processing</CardTitle>
                <CardDescription className="text-blue-600">
                  Process orders and automatically update inventory
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-0 rounded-xl p-6 bg-gradient-to-r from-white to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-blue-800 text-lg">Order {order.id}</h3>
                          <p className="text-sm text-blue-600">{order.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${
                              order.status === "completed"
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
                                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0"
                            }`}
                          >
                            {order.status}
                          </Badge>
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              onClick={() => processOrder(order.id)}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Complete Order
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item, index) => {
                          const product = products.find((p) => p.id === item.productId)
                          return (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm bg-white/50 p-3 rounded-lg"
                            >
                              <span className="font-medium text-blue-800">
                                {product?.name} x {item.quantity}
                              </span>
                              <span className="text-blue-600 font-medium">
                                Stock after: {product ? Math.max(0, product.stock - item.quantity) : 0}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Smart Reorder Suggestions
                  </CardTitle>
                  <CardDescription className="text-blue-600">AI-powered inventory recommendations</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
                      >
                        <div>
                          <p className="font-semibold text-orange-800">{product.name}</p>
                          <p className="text-sm text-orange-600">
                            Current: {product.stock} | Min: {product.minStock}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-700">Reorder: {product.minStock * 2}</p>
                          <Button
                            size="sm"
                            className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          >
                            Order Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Category Performance
                  </CardTitle>
                  <CardDescription className="text-blue-600">Stock levels by category</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const categoryProducts = products.filter((p) => p.category === category)
                      const totalStock = categoryProducts.reduce((sum, p) => sum + p.stock, 0)
                      const avgStock = totalStock / categoryProducts.length

                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between p-4 border border-blue-200 rounded-xl bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all duration-300"
                        >
                          <div>
                            <p className="font-semibold text-blue-800">{category}</p>
                            <p className="text-sm text-blue-600">{categoryProducts.length} products</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-700">Avg Stock: {avgStock.toFixed(1)}</p>
                            <p className="text-sm text-blue-600">Total: {totalStock}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}