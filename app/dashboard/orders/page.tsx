"use client"

import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Calendar, Eye, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function OrdersPage() {
  const { currentUser, orders, products, language } = useApp()

  const translations = {
    hi: {
      title: "मेरे ऑर्डर",
      subtitle: "अपने सभी ऑर्डर देखें और ट्रैक करें",
      noOrders: "कोई ऑर्डर नहीं",
      startShopping: "खरीदारी शुरू करें",
      orderNumber: "ऑर्डर नंबर",
      orderDate: "ऑर्डर की तारीख",
      status: "स्थिति",
      total: "कुल",
      items: "आइटम",
      viewDetails: "विवरण देखें",
      reorder: "फिर से ऑर्डर करें",
      statuses: {
        pending: "लंबित",
        confirmed: "पुष्ट",
        delivered: "डिलीवर",
        cancelled: "रद्द",
      },
    },
    en: {
      title: "My Orders",
      subtitle: "View and track all your orders",
      noOrders: "No orders yet",
      startShopping: "Start Shopping",
      orderNumber: "Order Number",
      orderDate: "Order Date",
      status: "Status",
      total: "Total",
      items: "Items",
      viewDetails: "View Details",
      reorder: "Reorder",
      statuses: {
        pending: "Pending",
        confirmed: "Confirmed",
        delivered: "Delivered",
        cancelled: "Cancelled",
      },
    },
  }

  if (!currentUser || currentUser.role !== "consumer") {
    return <div>Access denied</div>
  }

  const t = translations[language]

  const userOrders = orders.filter((o) => o.consumerId === currentUser.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "confirmed":
        return "secondary"
      case "pending":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {t.orderNumber}: #{order.id.slice(-8)}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.orderDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.items.length} {t.items}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(order.status)}>
                          {t.statuses[order.status as keyof typeof t.statuses]}
                        </Badge>
                        <div className="text-right">
                          <div className="font-semibold text-lg">₹{order.totalAmount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => {
                        const product = products.find((p) => p.id === item.productId)
                        if (!product) return null

                        return (
                          <div key={item.productId} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">
                                {language === "hi" ? product.nameHindi : product.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} × ₹{item.price} = ₹{(item.quantity * item.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        {t.viewDetails}
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {t.reorder}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{t.noOrders}</h3>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Button className="bg-gradient-green hover:opacity-90">{t.startShopping}</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
