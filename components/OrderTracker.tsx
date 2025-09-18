"use client"
import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react"
import { motion } from "framer-motion"

interface Order {
  id: string
  consumerId: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
  trackingSteps?: Array<{
    status: string
    timestamp: string
    location: string
    description: string
  }>
}

interface OrderTrackerProps {
  order: Order
}

export function OrderTracker({ order }: OrderTrackerProps) {
  const { products, users, language } = useApp()

  const translations = {
    hi: {
      orderTracking: "ऑर्डर ट्रैकिंग",
      orderNumber: "ऑर्डर नंबर",
      status: "स्थिति",
      estimatedDelivery: "अनुमानित डिलीवरी",
      trackingSteps: "ट्रैकिंग चरण",
      orderItems: "ऑर्डर आइटम",
      deliveryAddress: "डिलीवरी पता",
      contactInfo: "संपर्क जानकारी",
      statuses: {
        pending: "लंबित",
        confirmed: "पुष्ट",
        shipped: "भेजा गया",
        delivered: "डिलीवर",
        cancelled: "रद्द",
      },
      steps: {
        orderPlaced: "ऑर्डर दिया गया",
        orderConfirmed: "ऑर्डर पुष्ट",
        inTransit: "ट्रांजिट में",
        outForDelivery: "डिलीवरी के लिए निकला",
        delivered: "डिलीवर हो गया",
      },
    },
    en: {
      orderTracking: "Order Tracking",
      orderNumber: "Order Number",
      status: "Status",
      estimatedDelivery: "Estimated Delivery",
      trackingSteps: "Tracking Steps",
      orderItems: "Order Items",
      deliveryAddress: "Delivery Address",
      contactInfo: "Contact Info",
      statuses: {
        pending: "Pending",
        confirmed: "Confirmed",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      },
      steps: {
        orderPlaced: "Order Placed",
        orderConfirmed: "Order Confirmed",
        inTransit: "In Transit",
        outForDelivery: "Out for Delivery",
        delivered: "Delivered",
      },
    },
  }

  const t = translations[language]

  const consumer = users.find((u) => u.id === order.consumerId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "pending":
        return 20
      case "confirmed":
        return 40
      case "shipped":
        return 70
      case "delivered":
        return 100
      case "cancelled":
        return 0
      default:
        return 20
    }
  }

  const trackingSteps = [
    {
      status: "orderPlaced",
      timestamp: order.orderDate,
      location: "Digital Mandi",
      description: "Your order has been placed successfully",
      completed: true,
    },
    {
      status: "orderConfirmed",
      timestamp: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 min later
      location: "Farmer Location",
      description: "Order confirmed by farmer",
      completed: order.status !== "pending",
    },
    {
      status: "inTransit",
      timestamp: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours later
      location: "Distribution Center",
      description: "Package is in transit",
      completed: ["shipped", "delivered"].includes(order.status),
    },
    {
      status: "outForDelivery",
      timestamp: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      location: "Local Hub",
      description: "Out for delivery",
      completed: order.status === "delivered",
    },
    {
      status: "delivered",
      timestamp: order.deliveryDate || new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(),
      location: "Your Address",
      description: "Package delivered successfully",
      completed: order.status === "delivered",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t.orderNumber}: #{order.id.slice(-8)}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {t.statuses[order.status as keyof typeof t.statuses]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.status}</span>
              <span className="font-medium">{getProgressValue(order.status)}%</span>
            </div>
            <Progress value={getProgressValue(order.status)} className="h-2" />
          </div>

          {order.status !== "delivered" && order.status !== "cancelled" && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{t.estimatedDelivery}: </span>
              {new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tracking Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            {t.trackingSteps}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${step.completed ? "bg-green-500" : "bg-gray-200"}`}></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {t.steps[step.status as keyof typeof t.steps]}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {step.location}
                        </div>
                        {step.completed && <div>{new Date(step.timestamp).toLocaleString()}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>{t.orderItems}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null

              return (
                <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
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
            <Separator />
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Info */}
      {consumer && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t.deliveryAddress}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{consumer.name}</p>
                <p className="text-sm text-muted-foreground">{consumer.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {t.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{consumer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{consumer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
