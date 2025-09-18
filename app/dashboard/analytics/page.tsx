"use client"

import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Package, IndianRupee, Target } from "lucide-react"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const { currentUser, products, orders, language } = useApp()

  const translations = {
    hi: {
      title: "विश्लेषण और रिपोर्ट",
      subtitle: "अपने व्यापार की प्रदर्शन देखें",
      overview: "अवलोकन",
      salesTrend: "बिक्री का रुझान",
      productPerformance: "उत्पाद प्रदर्शन",
      categoryDistribution: "श्रेणी वितरण",
      monthlyRevenue: "मासिक आय",
      totalProducts: "कुल उत्पाद",
      totalRevenue: "कुल आय",
      avgOrderValue: "औसत ऑर्डर मूल्य",
      conversionRate: "रूपांतरण दर",
      topProducts: "शीर्ष उत्पाद",
      recentActivity: "हाल की गतिविधि",
      thisMonth: "इस महीने",
      lastMonth: "पिछले महीने",
      growth: "वृद्धि",
      categories: {
        grains: "अनाज",
        vegetables: "सब्जियां",
        fruits: "फल",
        pulses: "दालें",
        spices: "मसाले",
        dairy: "डेयरी",
      },
    },
    en: {
      title: "Analytics & Reports",
      subtitle: "Track your business performance",
      overview: "Overview",
      salesTrend: "Sales Trend",
      productPerformance: "Product Performance",
      categoryDistribution: "Category Distribution",
      monthlyRevenue: "Monthly Revenue",
      totalProducts: "Total Products",
      totalRevenue: "Total Revenue",
      avgOrderValue: "Avg Order Value",
      conversionRate: "Conversion Rate",
      topProducts: "Top Products",
      recentActivity: "Recent Activity",
      thisMonth: "This Month",
      lastMonth: "Last Month",
      growth: "Growth",
      categories: {
        grains: "Grains",
        vegetables: "Vegetables",
        fruits: "Fruits",
        pulses: "Pulses",
        spices: "Spices",
        dairy: "Dairy",
      },
    },
  }

  if (!currentUser || currentUser.role !== "farmer") {
    return <div>Access denied</div>
  }

  const t = translations[language]

  const userProducts = products.filter((p) => p.farmerId === currentUser.id)
  const totalRevenue = userProducts.reduce((sum, p) => sum + p.price * 10, 0) // Mock sales data

  // Mock data for charts
  const salesData = [
    { month: "Jan", revenue: 12000, orders: 45 },
    { month: "Feb", revenue: 15000, orders: 52 },
    { month: "Mar", revenue: 18000, orders: 61 },
    { month: "Apr", revenue: 22000, orders: 73 },
    { month: "May", revenue: 25000, orders: 84 },
    { month: "Jun", revenue: 28000, orders: 92 },
  ]

  const categoryData = userProducts.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(categoryData).map(([category, count]) => ({
    name: t.categories[category as keyof typeof t.categories] || category,
    value: count,
    color:
      {
        grains: "#8884d8",
        vegetables: "#82ca9d",
        fruits: "#ffc658",
        pulses: "#ff7300",
        spices: "#00ff00",
        dairy: "#0088fe",
      }[category] || "#8884d8",
  }))

  const productPerformanceData = userProducts.slice(0, 5).map((product) => ({
    name: language === "hi" ? product.nameHindi : product.name,
    sales: Math.floor(Math.random() * 100) + 20,
    revenue: product.price * (Math.floor(Math.random() * 50) + 10),
  }))

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

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+12%</Badge>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </div>
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
                <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+18%</Badge>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </div>
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
                <CardTitle className="text-sm font-medium">{t.avgOrderValue}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,250</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+8%</Badge>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.conversionRate}</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5%</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+3%</Badge>
                  <p className="text-xs text-muted-foreground">{t.thisMonth}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {t.salesTrend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.categoryDistribution}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t.productPerformance}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t.topProducts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-foreground">
                          {language === "hi" ? product.nameHindi : product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ₹{product.price}/{product.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ₹{(product.price * (Math.floor(Math.random() * 50) + 10)).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100) + 20} sales</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
