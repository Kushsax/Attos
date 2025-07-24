import {
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Search,
  Menu,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";

/**
 * @typedef {import("lucide-react").LucideIcon} LucideIcon
 */

/**
 * @type {Record<string, LucideIcon>}
 */
export const iconMap = {
  zap: Zap,
  shield: Shield,
  truck: Truck,
  "rotate-ccw": RotateCcw,
  star: Star,
  heart: Heart,
  share2: Share2,
  "shopping-cart": ShoppingCart,
  search: Search,
  menu: Menu,
  user: User,
  "map-pin": MapPin,
  "chevron-down": ChevronDown,
};

/**
 * Returns the Lucide icon component based on its name.
 * Defaults to the Zap icon if the specified icon is not found.
 *
 * @param {string} iconName - The name of the icon (e.g., "zap", "truck").
 * @returns {LucideIcon} The Lucide icon component.
 */
export const getIcon = (iconName) => {
  return iconMap[iconName] || Zap; // Default to Zap if icon not found
};