"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Navbar } from "@/components/Navbar"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Grid3X3, List, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

export default function MarketplacePage() {
  const { products, language } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const translations = {
    hi: {
      title: "डिजिटल मंडी बाज़ार",
      subtitle: "ताज़ी फसल सीधे किसानों से",
      search: "उत्पाद खोजें...",
      filter: "फ़िल्टर",
      sort: "क्रमबद्ध करें",
      category: "श्रेणी",
      priceRange: "मूल्य सीमा",
      viewMode: "देखने का तरीका",
      all: "सभी",
      newest: "नवीनतम",
      priceHigh: "मूल्य: अधिक से कम",
      priceLow: "मूल्य: कम से अधिक",
      popular: "लोकप्रिय",
      under50: "₹50 से कम",
      range50to100: "₹50 - ₹100",
      range100to200: "₹100 - ₹200",
      above200: "₹200 से अधिक",
      productsFound: "उत्पाद मिले",
      noProducts: "कोई उत्पाद नहीं मिला",
      tryDifferent: "अलग फ़िल्टर आज़माएं",
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
      title: "Digital Mandi Marketplace",
      subtitle: "Fresh produce directly from farmers",
      search: "Search products...",
      filter: "Filter",
      sort: "Sort",
      category: "Category",
      priceRange: "Price Range",
      viewMode: "View Mode",
      all: "All",
      newest: "Newest",
      priceHigh: "Price: High to Low",
      priceLow: "Price: Low to High",
      popular: "Popular",
      under50: "Under ₹50",
      range50to100: "₹50 - ₹100",
      range100to200: "₹100 - ₹200",
      above200: "Above ₹200",
      productsFound: "products found",
      noProducts: "No products found",
      tryDifferent: "Try different filters",
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

  const t = translations[language]

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameHindi.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under50" && product.price < 50) ||
        (priceRange === "50to100" && product.price >= 50 && product.price <= 100) ||
        (priceRange === "100to200" && product.price >= 100 && product.price <= 200) ||
        (priceRange === "above200" && product.price > 200)

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priceHigh":
          return b.price - a.price
        case "priceLow":
          return a.price - b.price
        case "popular":
          return Math.random() - 0.5 // Random for demo
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder={t.category} />
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

                {/* Price Range */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder={t.priceRange} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all}</SelectItem>
                    <SelectItem value="under50">{t.under50}</SelectItem>
                    <SelectItem value="50to100">{t.range50to100}</SelectItem>
                    <SelectItem value="100to200">{t.range100to200}</SelectItem>
                    <SelectItem value="above200">{t.above200}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder={t.sort} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t.newest}</SelectItem>
                    <SelectItem value="popular">{t.popular}</SelectItem>
                    <SelectItem value="priceLow">{t.priceLow}</SelectItem>
                    <SelectItem value="priceHigh">{t.priceHigh}</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-gradient-green hover:opacity-90" : "bg-transparent"}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-gradient-green hover:opacity-90" : "bg-transparent"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {filteredProducts.length} {t.productsFound}
            </Badge>
            {(searchTerm || categoryFilter !== "all" || priceRange !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setPriceRange("all")
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t.noProducts}</h3>
            <p className="text-muted-foreground mb-6">{t.tryDifferent}</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setPriceRange("all")
              }}
              className="bg-gradient-green hover:opacity-90"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
