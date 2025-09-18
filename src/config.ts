export interface User {
  id: string
  name: string
  email: string
  role: "farmer" | "consumer"
  phone: string
  location: string
}

export interface Product {
  id: string
  name: string
  nameHindi: string
  price: number
  quantity: number
  unit: string
  category: string
  farmerId: string
  image: string
  specifications: {
    organic: boolean
    variety: string
    harvestDate: string
  }
  aiSuggestedPrice: number
  createdAt: string
}

export interface Order {
  id: string
  consumerId: string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
}

export interface Reward {
  id: string
  farmerId: string
  points: number
  type: string
  description: string
  earnedAt: string
}

export interface ConfigData {
  users: User[]
  products: Product[]
  orders: Order[]
  rewards: Reward[]
  settings: {
    defaultLanguage: "hi" | "en"
    supportedLanguages: ("hi" | "en")[]
    currency: string
    geminiApiKey: string
  }
}

const configData: ConfigData = {
  users: [
    {
      id: "farmer1",
      name: "राम कुमार",
      email: "ram@farmer.com",
      role: "farmer",
      phone: "+91 9876543210",
      location: "Punjab, India",
    },
    {
      id: "consumer1",
      name: "प्रिया शर्मा",
      email: "priya@consumer.com",
      role: "consumer",
      phone: "+91 9876543211",
      location: "Delhi, India",
    },
  ],
  products: [
    {
      id: "prod1",
      name: "Organic Basmati Rice",
      nameHindi: "जैविक बासमती चावल",
      price: 120,
      quantity: 500,
      unit: "kg",
      category: "Grains",
      farmerId: "farmer1",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      specifications: {
        organic: true,
        variety: "Basmati 1121",
        harvestDate: "2024-01-15",
      },
      aiSuggestedPrice: 125,
      createdAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "prod2",
      name: "Fresh Tomatoes",
      nameHindi: "ताज़े टमाटर",
      price: 40,
      quantity: 200,
      unit: "kg",
      category: "Vegetables",
      farmerId: "farmer1",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      specifications: {
        organic: false,
        variety: "Hybrid",
        harvestDate: "2024-01-18",
      },
      aiSuggestedPrice: 45,
      createdAt: "2024-01-20T11:00:00Z",
    },
    {
      id: "prod3",
      name: "Organic Wheat",
      nameHindi: "जैविक गेहूं",
      price: 35,
      quantity: 1000,
      unit: "kg",
      category: "Grains",
      farmerId: "farmer1",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      specifications: {
        organic: true,
        variety: "Sharbati",
        harvestDate: "2024-01-10",
      },
      aiSuggestedPrice: 38,
      createdAt: "2024-01-20T12:00:00Z",
    },
  ],
  orders: [
    {
      id: "order1",
      consumerId: "consumer1",
      items: [
        {
          productId: "prod1",
          quantity: 10,
          price: 120,
        },
      ],
      totalAmount: 1200,
      status: "delivered",
      orderDate: "2024-01-15T10:00:00Z",
      deliveryDate: "2024-01-18T15:00:00Z",
    },
  ],
  rewards: [
    {
      id: "reward1",
      farmerId: "farmer1",
      points: 150,
      type: "sale_bonus",
      description: "Bonus for selling organic products",
      earnedAt: "2024-01-20T10:00:00Z",
    },
  ],
  settings: {
    defaultLanguage: "hi",
    supportedLanguages: ["hi", "en"],
    currency: "INR",
    geminiApiKey: "your-gemini-api-key-here",
  },
}

export default configData
