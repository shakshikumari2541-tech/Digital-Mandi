"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import configData from "@/src/config"

interface User {
  id: string
  name: string
  email: string
  role: "farmer" | "consumer"
  phone: string
  location: string
}

interface Product {
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

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface Order {
  id: string
  consumerId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
}

interface Reward {
  id: string
  farmerId: string
  points: number
  type: string
  description: string
  earnedAt: string
}

interface AppContextType {
  currentUser: User | null
  users: User[]
  products: Product[]
  orders: Order[]
  rewards: Reward[]
  cart: CartItem[]
  language: "hi" | "en"
  login: (email: string, role: "farmer" | "consumer") => boolean
  logout: () => void
  addToCart: (productId: string, quantity: number, price: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (productId: string, updates: Partial<Product>) => void
  placeOrder: (items: CartItem[]) => void
  toggleLanguage: () => void
  addReward: (farmerId: string, points: number, type: string, description: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(configData.users)
  const [products, setProducts] = useState<Product[]>(configData.products)
  const [orders, setOrders] = useState<Order[]>(configData.orders)
  const [rewards, setRewards] = useState<Reward[]>(configData.rewards)
  const [cart, setCart] = useState<CartItem[]>([])
  const [language, setLanguage] = useState<"hi" | "en">("hi")

  useEffect(() => {
    // Load from localStorage on mount
    const savedUser = localStorage.getItem("currentUser")
    const savedCart = localStorage.getItem("cart")
    const savedLanguage = localStorage.getItem("language")

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedLanguage) setLanguage(savedLanguage as "hi" | "en")
  }, [])

  useEffect(() => {
    // Save to localStorage when state changes
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const login = (email: string, role: "farmer" | "consumer") => {
    const user = users.find((u) => u.email === email && u.role === role)
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    setCurrentUser(null)
    setCart([])
  }

  const addToCart = (productId: string, quantity: number, price: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { productId, quantity, price }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: `prod${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, ...updates } : product)))
  }

  const placeOrder = (items: CartItem[]) => {
    if (!currentUser) return

    const newOrder: Order = {
      id: `order${Date.now()}`,
      consumerId: currentUser.id,
      items,
      totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "pending",
      orderDate: new Date().toISOString(),
    }

    setOrders((prev) => [...prev, newOrder])
    clearCart()
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "hi" ? "en" : "hi"))
  }

  const addReward = (farmerId: string, points: number, type: string, description: string) => {
    const newReward: Reward = {
      id: `reward${Date.now()}`,
      farmerId,
      points,
      type,
      description,
      earnedAt: new Date().toISOString(),
    }
    setRewards((prev) => [...prev, newReward])
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        products,
        orders,
        rewards,
        cart,
        language,
        login,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        placeOrder,
        toggleLanguage,
        addReward,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export const useAppContext = useApp
