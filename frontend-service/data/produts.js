/**
 * @typedef {Object} ProductImage
 * @property {string} src
 * @property {string} alt
 */

/**
 * @typedef {Object} ProductPrice
 * @property {number} current
 * @property {number} original
 * @property {number} discount
 */

/**
 * @typedef {Object} ProductReviews
 * @property {number} rating
 * @property {number} count
 * @property {number} average
 */

/**
 * @typedef {Object} KeyFeature
 * @property {string} icon
 * @property {string} text
 */

/**
 * @typedef {Object} ProductSpecification
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} ProductCategory
 * @property {string} main
 * @property {string} sub
 * @property {string} specific
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} brand
 * @property {string} model
 * @property {string} description
 * @property {ProductImage[]} images
 * @property {ProductPrice} price
 * @property {ProductReviews} reviews
 * @property {string[]} badges
 * @property {KeyFeature[]} keyFeatures
 * @property {ProductSpecification[]} specifications
 * @property {string[]} features
 * @property {boolean} inStock
 * @property {string} deliveryTime
 * @property {number} freeDeliveryThreshold
 * @property {string} returnPolicy
 * @property {ProductCategory} category
 */

/** @type {Product[]} */
export const products = [
  {
    id: "boat-type-c-cable-a750",
    name: "Type C Cable w/ 6.5A Super Fast Charging, Stress Resistance Type C A750 - Rebellious Black",
    brand: "boAt",
    model: "A7500",
    description:
      "Experience lightning-fast charging with boAt's premium Type-C cable featuring 6.5A super fast charging capability and stress-resistant design.",
    images: [
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Main+View",
        alt: "boAt Type C Cable - Main View",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Side+Angle",
        alt: "boAt Type C Cable - Side View",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Connector+Detail",
        alt: "boAt Type C Cable - Connector Detail",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Package+Contents",
        alt: "boAt Type C Cable - Package Contents",
      },
    ],
    price: {
      current: 399,
      original: 799,
      discount: 50,
    },
    reviews: {
      rating: 4.5,
      count: 2847,
      average: 4.5,
    },
    badges: ["In Stock", "Fast Charging", "50% OFF"],
    keyFeatures: [
      {
        icon: "zap",
        text: "6.5A Fast Charging",
      },
      {
        icon: "shield",
        text: "Stress Resistant",
      },
      {
        icon: "truck",
        text: "Free Delivery",
      },
      {
        icon: "rotate-ccw",
        text: "7 Day Return",
      },
    ],
    specifications: [
      {
        label: "Brand",
        value: "boAt",
      },
      {
        label: "Model",
        value: "A780",
      },
      {
        label: "Cable Type",
        value: "Type-C",
      },
      {
        label: "Charging Speed",
        value: "6.5A",
      },
      {
        label: "Length",
        value: "1.2m",
      },
      {
        label: "Color",
        value: "Rebellious Black",
      },
      {
        label: "Material",
        value: "Premium TPE",
      },
      {
        label: "Connector",
        value: "USB-A to Type-C",
      },
    ],
    features: [
      "6.5A super fast charging capability",
      "Stress-resistant design for durability",
      "Premium quality materials",
      "Universal Type-C compatibility",
      "Tangle-free design",
      "Heat-resistant construction",
      "Gold-plated connectors for better conductivity",
      "Reinforced stress points",
    ],
    inStock: true,
    deliveryTime: "10 mins",
    freeDeliveryThreshold: 199,
    returnPolicy: "7 Day Return",
    category: {
      main: "Electronics",
      sub: "Cables & Chargers",
      specific: "Type-C Cables",
    },
  },
  {
    id: "boat-type-c-cable-a750",
    name:"Boat Type C Cable w/ 6.5A Super Fast Charging, Stress Resistance Type C A750 - Rebellious Black",
    brand: "boAt",
    model: "A7500",
    description:
      "Experience lightning-fast charging with boAt's premium Type-C cable featuring 6.5A super fast charging capability and stress-resistant design.",
    images: [
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Main+View",
        alt: "boAt Type C Cable - Main View",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Side+Angle",
        alt: "boAt Type C Cable - Side View",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Connector+Detail",
        alt: "boAt Type C Cable - Connector Detail",
      },
      {
        src: "/placeholder.svg?height=400&width=400&text=boAt+Cable+Package+Contents",
        alt: "boAt Type C Cable - Package Contents",
      },
    ],
    price: {
      current: 399,
      original: 799,
      discount: 50,
    },
    reviews: {
      rating: 4.5,
      count: 2847,
      average: 4.5,
    },
    badges: ["In Stock", "Fast Charging", "50% OFF"],
    keyFeatures: [
      {
        icon: "zap",
        text: "6.5A Fast Charging",
      },
      {
        icon: "shield",
        text: "Stress Resistant",
      },
      {
        icon: "truck",
        text: "Free Delivery",
      },
      {
        icon: "rotate-ccw",
        text: "7 Day Return",
      },
    ],
    specifications: [
      {
        label: "Brand",
        value: "boAt",
      },
      {
        label: "Model",
        value: "A780",
      },
      {
        label: "Cable Type",
        value: "Type-C",
      },
      {
        label: "Charging Speed",
        value: "6.5A",
      },
      {
        label: "Length",
        value: "1.2m",
      },
      {
        label: "Color",
        value: "Rebellious Black",
      },
      {
        label: "Material",
        value: "Premium TPE",
      },
      {
        label: "Connector",
        value: "USB-A to Type-C",
      },
    ],
    features: [
      "6.5A super fast charging capability",
      "Stress-resistant design for durability",
      "Premium quality materials",
      "Universal Type-C compatibility",
      "Tangle-free design",
      "Heat-resistant construction",
      "Gold-plated connectors for better conductivity",
      "Reinforced stress points",
    ],
    inStock: true,
    deliveryTime: "10 mins",
    freeDeliveryThreshold: 199,
    returnPolicy: "7 Day Return",
    category: {
      main: "Electronics",
      sub: "Cables & Chargers",
      specific: "Type-C Cables",
    },
  }
  
];

// Helper function to get product by ID
/**
 * @param {string} id
 * @returns {Product | undefined}
 */
export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

// Helper function to get products by category
/**
 * @param {string} category
 * @returns {Product[]}
 */
export const getProductsByCategory = (category) => {
  return products.filter(
    (product) =>
      product.category.main.toLowerCase().includes(category.toLowerCase()) ||
      product.category.sub.toLowerCase().includes(category.toLowerCase()) ||
      product.category.specific.toLowerCase().includes(category.toLowerCase()),
  );
};

// Helper function to get products by brand
/**
 * @param {string} brand
 * @returns {Product[]}
 */
export const getProductsByBrand = (brand) => {
  return products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase());
};