"use client"

import { useApp } from "@/contexts/AppContext"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export default function CartPage() {
  const { cart, products, removeFromCart, addToCart, clearCart, placeOrder, language, currentUser } = useApp()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const translations = {
    hi: {
      title: "आपका कार्ट",
      subtitle: "अपने चुने गए उत्पादों की समीक्षा करें",
      emptyCart: "आपका कार्ट खाली है",
      startShopping: "खरीदारी शुरू करें",
      quantity: "मात्रा",
      price: "मूल्य",
      total: "कुल",
      subtotal: "उप-योग",
      delivery: "डिलीवरी",
      free: "मुफ्त",
      grandTotal: "कुल योग",
      checkout: "चेकआउट",
      continueShopping: "खरीदारी जारी रखें",
      remove: "हटाएं",
      update: "अपडेट",
      orderPlaced: "ऑर्डर दिया गया!",
      thankYou: "आपके ऑर्डर के लिए धन्यवाद",
    },
    en: {
      title: "Your Cart",
      subtitle: "Review your selected products",
      emptyCart: "Your cart is empty",
      startShopping: "Start Shopping",
      quantity: "Quantity",
      price: "Price",
      total: "Total",
      subtotal: "Subtotal",
      delivery: "Delivery",
      free: "Free",
      grandTotal: "Grand Total",
      checkout: "Checkout",
      continueShopping: "Continue Shopping",
      remove: "Remove",
      update: "Update",
      orderPlaced: "Order Placed!",
      thankYou: "Thank you for your order",
    },
  }

  const t = translations[language]

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return { ...item, product }
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 0 // Free delivery
  const grandTotal = subtotal + deliveryFee

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      // Remove current item and add with new quantity
      removeFromCart(productId)
      const item = cartItems.find((item) => item.productId === productId)
      if (item) {
        addToCart(productId, newQuantity, item.price)
      }
    }
  }

  const handleCheckout = async () => {
    if (!currentUser || cart.length === 0) return

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      placeOrder(cart)
      setIsCheckingOut(false)
    }, 2000)
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Please Login</h3>
              <p className="text-muted-foreground mb-6">You need to login to view your cart</p>
              <Link href="/login">
                <Button className="bg-gradient-green hover:opacity-90">Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => {
                  if (!item.product) return null

                  return (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Product Image */}
                            <div className="w-full sm:w-24 h-24 flex-shrink-0">
                              <img
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-foreground">
                                    {language === "hi" ? item.product.nameHindi : item.product.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    ₹{item.price}/{item.product.unit}
                                  </p>
                                  {item.product.specifications.organic && (
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">
                                      Organic
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-foreground">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    className="h-8 w-8 p-0 bg-transparent"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateQuantity(item.productId, Number.parseInt(e.target.value) || 1)
                                    }
                                    className="w-16 h-8 text-center"
                                    min="1"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    className="h-8 w-8 p-0 bg-transparent"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.productId)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  {t.remove}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.subtotal}</span>
                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.delivery}</span>
                        <span className="font-medium text-green-600">{t.free}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>{t.grandTotal}</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-gradient-green hover:opacity-90"
                      >
                        {isCheckingOut ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            {t.checkout}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <Link href="/marketplace">
                        <Button variant="outline" className="w-full bg-transparent">
                          {t.continueShopping}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="p-12">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t.emptyCart}</h3>
                  <p className="text-muted-foreground mb-6">Add some products to get started</p>
                  <Link href="/marketplace">
                    <Button className="bg-gradient-green hover:opacity-90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t.startShopping}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
