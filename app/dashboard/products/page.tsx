"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Filter, Edit, Trash2, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProductsPage() {
  const { currentUser, products, language, updateProduct } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const translations = {
    hi: {
      title: "मेरे उत्पाद",
      subtitle: "अपने सभी उत्पादों को प्रबंधित करें",
      addProduct: "नया उत्पाद जोड़ें",
      search: "उत्पाद खोजें...",
      filter: "श्रेणी फ़िल्टर",
      all: "सभी",
      noProducts: "कोई उत्पाद नहीं मिला",
      addFirst: "अपना पहला उत्पाद जोड़ें",
      edit: "संपादित करें",
      delete: "हटाएं",
      view: "देखें",
      price: "मूल्य",
      quantity: "मात्रा",
      category: "श्रेणी",
      organic: "जैविक",
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
      title: "My Products",
      subtitle: "Manage all your products",
      addProduct: "Add New Product",
      search: "Search products...",
      filter: "Category Filter",
      all: "All",
      noProducts: "No products found",
      addFirst: "Add your first product",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      price: "Price",
      quantity: "Quantity",
      category: "Category",
      organic: "Organic",
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

  const filteredProducts = userProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameHindi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <Link href="/dashboard/add-product">
            <Button className="bg-gradient-green hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProduct}
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={t.filter} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all}</SelectItem>
                    <SelectItem value="grains">{t.categories.grains}</SelectItem>
                    <SelectItem value="vegetables">{t.categories.vegetables}</SelectItem>
                    <SelectItem value="fruits">{t.categories.fruits}</SelectItem>
                    <SelectItem value="pulses">{t.categories.pulses}</SelectItem>
                    <SelectItem value="spices">{t.categories.spices}</SelectItem>
                    <SelectItem value="dairy">{t.categories.dairy}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow card-3d">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.specifications.organic && (
                      <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">{t.organic}</Badge>
                    )}
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {language === "hi" ? product.nameHindi : product.name}
                      </h3>
                      <Badge variant="secondary">{t.categories[product.category as keyof typeof t.categories]}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.price}:</span>
                        <span className="font-semibold text-primary">
                          ₹{product.price}/{product.unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{t.quantity}:</span>
                        <span className="font-medium">
                          {product.quantity} {product.unit}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        {t.view}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="w-4 h-4 mr-1" />
                        {t.edit}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
                <h3 className="text-xl font-semibold text-foreground mb-2">{t.noProducts}</h3>
                <p className="text-muted-foreground mb-6">{t.addFirst}</p>
                <Link href="/dashboard/add-product">
                  <Button className="bg-gradient-green hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addProduct}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
