export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
  image: string
  description?: string
  unit?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  name: string
  icon: string
  color: string
  image: string
}
