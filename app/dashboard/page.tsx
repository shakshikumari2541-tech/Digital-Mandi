"use client"

import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, ShoppingCart, Gift, BarChart3 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { currentUser, products, orders, rewards, cart, language } = useApp()

  const translations = {
    hi: {
      welcome: "स्वागत है",
      farmer: {
        title: "किसान डैशबोर्ड",
        subtitle: "अपने व्यापार का अवलोकन देखें",
        totalProducts: "कुल उत्पाद",
        totalSales: "कुल बिक्री",
        rewardPoints: "पुरस्कार अंक",
        quickActions: "त्वरित कार्य",
        addProduct: "नया उत्पाद जोड़ें",
        viewProducts: "उत्पाद देखें",
        checkRewards: "पुरस्कार देखें",
        recentProducts: "हाल के उत्पाद",
        viewAll: "सभी देखें",
      },
      consumer: {
        title: "उपभोक्ता डैशबोर्ड",
        subtitle: "अपनी खरीदारी का अवलोकन देखें",
        cartItems: "कार्ट में आइटम",
        totalOrders: "कुल ऑर्डर",
        totalSpent: "कुल खर्च",
        quickActions: "त्वरित कार्य",
        browseMarket: "बाज़ार देखें",
        viewCart: "कार्ट देखें",
        orderHistory: "ऑर्डर इतिहास",
        recentOrders: "हाल के ऑर्डर",
        viewAll: "सभी देखें",
        noOrders: "कोई ऑर्डर नहीं",
        startShopping: "खरीदारी शुरू करें",
      },
    },
    en: {
      welcome: "Welcome",
      farmer: {
        title: "Farmer Dashboard",
        subtitle: "Overview of your farming business",
        totalProducts: "Total Products",
        totalSales: "Total Sales",
        rewardPoints: "Reward Points",
        quickActions: "Quick Actions",
        addProduct: "Add New Product",
        viewProducts: "View Products",
        checkRewards: "Check Rewards",
        recentProducts: "Recent Products",
        viewAll: "View All",
      },
      consumer: {
        title: "Consumer Dashboard",
        subtitle: "Overview of your shopping activity",
        cartItems: "Cart Items",
        totalOrders: "Total Orders",
        totalSpent: "Total Spent",
        quickActions: "Quick Actions",
        browseMarket: "Browse Market",
        viewCart: "View Cart",
        orderHistory: "Order History",
        recentOrders: "Recent Orders",
        viewAll: "View All",
        noOrders: "No orders yet",
        startShopping: "Start Shopping",
      },
    },
  }

  if (!currentUser) return null

  const t = translations[language][currentUser.role]
  const welcomeText = translations[language].welcome

  // Calculate stats
  const userProducts = products.filter((p) => p.farmerId === currentUser.id)
  const userOrders = orders.filter((o) => o.consumerId === currentUser.id)
  const userRewards = rewards.filter((r) => r.farmerId === currentUser.id)
  const totalRewardPoints = userRewards.reduce((sum, r) => sum + r.points, 0)
  const totalSpent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          {welcomeText}, {currentUser.name}!
        </h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </motion.div>

      {currentUser.role === "farmer" ? (
        <>
          {/* Farmer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.totalProducts}</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProducts.length}</div>
                  <p className="text-xs text-muted-foreground">Active products in marketplace</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.totalSales}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(userProducts.length * 1500).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Revenue this month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.rewardPoints}</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRewardPoints}</div>
                  <p className="text-xs text-muted-foreground">Available for redemption</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/dashboard/add-product">
                    <Button className="w-full bg-gradient-green hover:opacity-90">
                      <Package className="w-4 h-4 mr-2" />
                      {t.addProduct}
                    </Button>
                  </Link>
                  <Link href="/dashboard/products">
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {t.viewProducts}
                    </Button>
                  </Link>
                  <Link href="/dashboard/rewards">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Gift className="w-4 h-4 mr-2" />
                      {t.checkRewards}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t.recentProducts}</CardTitle>
                <Link href="/dashboard/products">
                  <Button variant="ghost" size="sm">
                    {t.viewAll}
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{language === "hi" ? product.nameHindi : product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {product.quantity} {product.unit}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        <>
          {/* Consumer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.cartItems}</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cart.length}</div>
                  <p className="text-xs text-muted-foreground">Items ready for checkout</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.totalOrders}</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userOrders.length}</div>
                  <p className="text-xs text-muted-foreground">Orders placed</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.totalSpent}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total spending</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/marketplace">
                    <Button className="w-full bg-gradient-green hover:opacity-90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t.browseMarket}
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Package className="w-4 h-4 mr-2" />
                      {t.viewCart}
                    </Button>
                  </Link>
                  <Link href="/dashboard/orders">
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {t.orderHistory}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t.recentOrders}</CardTitle>
                <Link href="/dashboard/orders">
                  <Button variant="ghost" size="sm">
                    {t.viewAll}
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {userOrders.length > 0 ? (
                  <div className="space-y-4">
                    {userOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Order #{order.id.slice(-6)}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.totalAmount}</p>
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "default"
                                : order.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">{t.noOrders}</p>
                    <Link href="/marketplace">
                      <Button className="bg-gradient-green hover:opacity-90">{t.startShopping}</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  )
}
