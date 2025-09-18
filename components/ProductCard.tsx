"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Leaf, MapPin } from "lucide-react"
import { motion } from "framer-motion"

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

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, users, language, currentUser } = useApp()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const farmer = users.find((u) => u.id === product.farmerId)

  const translations = {
    hi: {
      addToCart: "कार्ट में जोड़ें",
      organic: "जैविक",
      fresh: "ताज़ा",
      farmer: "किसान",
      variety: "किस्म",
      harvest: "फसल",
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
      addToCart: "Add to Cart",
      organic: "Organic",
      fresh: "Fresh",
      farmer: "Farmer",
      variety: "Variety",
      harvest: "Harvest",
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

  const handleAddToCart = async () => {
    if (!currentUser) return

    setIsAdding(true)
    addToCart(product.id, 1, product.price)

    // Simulate loading
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden card-3d group cursor-pointer">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500"
            animate={{ scale: isHovered ? 1.1 : 1 }}
          />

          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.specifications.organic && (
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                <Leaf className="w-3 h-3 mr-1" />
                {t.organic}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {t.fresh}
            </Badge>
          </div>

          {/* Heart icon */}
          <motion.div className="absolute top-2 right-2" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={isAdding || !currentUser}
                className="bg-gradient-green hover:opacity-90 text-white shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdding ? "..." : t.addToCart}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Product name and category */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {language === "hi" ? product.nameHindi : product.name}
            </h3>
            <Badge variant="outline" className="text-xs">
              {t.categories[product.category as keyof typeof t.categories]}
            </Badge>
          </div>

          {/* Price and rating */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                ₹{product.price}
                <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {product.quantity} {product.unit}
              </div>
              <div className="text-xs text-muted-foreground">{language === "hi" ? "उपलब्ध" : "available"}</div>
            </div>
          </div>

          {/* Farmer info */}
          {farmer && (
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <div className="w-6 h-6 bg-gradient-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{farmer.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">{farmer.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{farmer.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Product details */}
          <div className="space-y-1 text-xs text-muted-foreground">
            {product.specifications.variety && (
              <div>
                {t.variety}: {product.specifications.variety}
              </div>
            )}
            {product.specifications.harvestDate && (
              <div>
                {t.harvest}: {new Date(product.specifications.harvestDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Add to cart button (mobile) */}
          <div className="block sm:hidden pt-2">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || !currentUser}
              className="w-full bg-gradient-green hover:opacity-90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAdding ? "..." : t.addToCart}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
