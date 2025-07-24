import {
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Leaf,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Search,
  Menu,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react"

const iconMap = {
  zap: Zap,
  shield: Shield,
  truck: Truck,
  "rotate-ccw": RotateCcw,
  leaf: Leaf,
  star: Star,
  heart: Heart,
  share2: Share2,
  "shopping-cart": ShoppingCart,
  search: Search,
  menu: Menu,
  user: User,
  "map-pin": MapPin,
  "chevron-down": ChevronDown,
}

export const getIcon = (iconName) => {
  return iconMap[iconName] || Star
}
