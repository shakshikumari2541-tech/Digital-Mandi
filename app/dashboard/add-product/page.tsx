"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Plus, Sparkles, AlertCircle, ImageIcon, IndianRupee } from "lucide-react"
import { motion } from "framer-motion"

export default function AddProductPage() {
  const { currentUser, addProduct, language, addReward } = useApp()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    nameHindi: "",
    price: "",
    quantity: "",
    unit: "kg",
    category: "",
    image: "",
    organic: false,
    variety: "",
    harvestDate: "",
  })

  const [aiSuggestedPrice, setAiSuggestedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const translations = {
    hi: {
      title: "नया उत्पाद जोड़ें",
      subtitle: "अपने उत्पाद की जानकारी भरें",
      productName: "उत्पाद का नाम (अंग्रेजी)",
      productNameHindi: "उत्पाद का नाम (हिंदी)",
      price: "मूल्य",
      quantity: "मात्रा",
      unit: "इकाई",
      category: "श्रेणी",
      imageUrl: "छवि URL",
      organic: "जैविक उत्पाद",
      variety: "किस्म",
      harvestDate: "फसल की तारीख",
      aiPricing: "AI मूल्य सुझाव",
      getAiPrice: "AI मूल्य प्राप्त करें",
      aiSuggested: "AI सुझाया गया मूल्य",
      useAiPrice: "AI मूल्य का उपयोग करें",
      addProduct: "उत्पाद जोड़ें",
      cancel: "रद्द करें",
      categories: {
        grains: "अनाज",
        vegetables: "सब्जियां",
        fruits: "फल",
        pulses: "दालें",
        spices: "मसाले",
        dairy: "डेयरी",
      },
      units: {
        kg: "किलो",
        gram: "ग्राम",
        liter: "लीटर",
        piece: "पीस",
        dozen: "दर्जन",
        quintal: "क्विंटल",
      },
      placeholders: {
        name: "जैसे: Basmati Rice",
        nameHindi: "जैसे: बासमती चावल",
        price: "प्रति किलो मूल्य",
        quantity: "उपलब्ध मात्रा",
        imageUrl: "उत्पाद की छवि का URL",
        variety: "जैसे: बासमती 1121",
      },
      success: "उत्पाद सफलतापूर्वक जोड़ा गया!",
      error: "कृपया सभी आवश्यक फील्ड भरें",
    },
    en: {
      title: "Add New Product",
      subtitle: "Fill in your product details",
      productName: "Product Name (English)",
      productNameHindi: "Product Name (Hindi)",
      price: "Price",
      quantity: "Quantity",
      unit: "Unit",
      category: "Category",
      imageUrl: "Image URL",
      organic: "Organic Product",
      variety: "Variety",
      harvestDate: "Harvest Date",
      aiPricing: "AI Price Suggestion",
      getAiPrice: "Get AI Price",
      aiSuggested: "AI Suggested Price",
      useAiPrice: "Use AI Price",
      addProduct: "Add Product",
      cancel: "Cancel",
      categories: {
        grains: "Grains",
        vegetables: "Vegetables",
        fruits: "Fruits",
        pulses: "Pulses",
        spices: "Spices",
        dairy: "Dairy",
      },
      units: {
        kg: "Kg",
        gram: "Gram",
        liter: "Liter",
        piece: "Piece",
        dozen: "Dozen",
        quintal: "Quintal",
      },
      placeholders: {
        name: "e.g., Basmati Rice",
        nameHindi: "e.g., बासमती चावल",
        price: "Price per unit",
        quantity: "Available quantity",
        imageUrl: "Product image URL",
        variety: "e.g., Basmati 1121",
      },
      success: "Product added successfully!",
      error: "Please fill all required fields",
    },
  }

  const t = translations[language]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const getAiPriceSuggestion = async () => {
    if (!formData.name || !formData.category) {
      setError(language === "hi" ? "कृपया उत्पाद का नाम और श्रेणी भरें" : "Please fill product name and category")
      return
    }

    setIsLoading(true)
    try {
      // Mock AI price suggestion based on category and product
      const basePrices: Record<string, number> = {
        grains: 50,
        vegetables: 30,
        fruits: 80,
        pulses: 120,
        spices: 200,
        dairy: 60,
      }

      const basePrice = basePrices[formData.category] || 50
      const organicMultiplier = formData.organic ? 1.3 : 1
      const randomVariation = 0.8 + Math.random() * 0.4 // ±20% variation

      const suggestedPrice = Math.round(basePrice * organicMultiplier * randomVariation)
      setAiSuggestedPrice(suggestedPrice)
    } catch (error) {
      console.error("AI pricing error:", error)
      setError(language === "hi" ? "AI मूल्य सुझाव में त्रुटि" : "Error getting AI price suggestion")
    } finally {
      setIsLoading(false)
    }
  }

  const useAiPrice = () => {
    if (aiSuggestedPrice) {
      setFormData((prev) => ({ ...prev, price: aiSuggestedPrice.toString() }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.nameHindi || !formData.price || !formData.quantity || !formData.category) {
      setError(t.error)
      return
    }

    if (!currentUser) return

    const newProduct = {
      name: formData.name,
      nameHindi: formData.nameHindi,
      price: Number.parseFloat(formData.price),
      quantity: Number.parseInt(formData.quantity),
      unit: formData.unit,
      category: formData.category,
      farmerId: currentUser.id,
      image: formData.image || `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400`,
      specifications: {
        organic: formData.organic,
        variety: formData.variety,
        harvestDate: formData.harvestDate,
      },
      aiSuggestedPrice: aiSuggestedPrice || Number.parseFloat(formData.price),
    }

    addProduct(newProduct)

    // Add reward points for adding a product
    addReward(currentUser.id, 10, "product_added", "Added new product to marketplace")

    router.push("/dashboard/products")
  }

  if (!currentUser || currentUser.role !== "farmer") {
    return <div>Access denied</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.productName} *</Label>
                  <Input
                    id="name"
                    placeholder={t.placeholders.name}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameHindi">{t.productNameHindi} *</Label>
                  <Input
                    id="nameHindi"
                    placeholder={t.placeholders.nameHindi}
                    value={formData.nameHindi}
                    onChange={(e) => handleInputChange("nameHindi", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t.category} *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grains">{t.categories.grains}</SelectItem>
                      <SelectItem value="vegetables">{t.categories.vegetables}</SelectItem>
                      <SelectItem value="fruits">{t.categories.fruits}</SelectItem>
                      <SelectItem value="pulses">{t.categories.pulses}</SelectItem>
                      <SelectItem value="spices">{t.categories.spices}</SelectItem>
                      <SelectItem value="dairy">{t.categories.dairy}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">{t.imageUrl}</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="image"
                      placeholder={t.placeholders.imageUrl}
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Quantity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Pricing & Quantity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">{t.quantity} *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder={t.placeholders.quantity}
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">{t.unit}</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">{t.units.kg}</SelectItem>
                        <SelectItem value="gram">{t.units.gram}</SelectItem>
                        <SelectItem value="liter">{t.units.liter}</SelectItem>
                        <SelectItem value="piece">{t.units.piece}</SelectItem>
                        <SelectItem value="dozen">{t.units.dozen}</SelectItem>
                        <SelectItem value="quintal">{t.units.quintal}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t.price} *</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder={t.placeholders.price}
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* AI Price Suggestion */}
                <div className="space-y-4 p-4 bg-gradient-green-light rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm">{t.aiPricing}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={getAiPriceSuggestion}
                      disabled={isLoading}
                      className="bg-transparent"
                    >
                      {isLoading ? "..." : t.getAiPrice}
                    </Button>
                  </div>

                  {aiSuggestedPrice && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {t.aiSuggested}: ₹{aiSuggestedPrice}
                        </Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={useAiPrice}>
                        {t.useAiPrice}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="organic">{t.organic}</Label>
                  <p className="text-sm text-muted-foreground">Mark if this is an organic product</p>
                </div>
                <Switch
                  id="organic"
                  checked={formData.organic}
                  onCheckedChange={(checked) => handleInputChange("organic", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variety">{t.variety}</Label>
                  <Input
                    id="variety"
                    placeholder={t.placeholders.variety}
                    value={formData.variety}
                    onChange={(e) => handleInputChange("variety", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">{t.harvestDate}</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()} className="bg-transparent">
              {t.cancel}
            </Button>
            <Button type="submit" className="bg-gradient-green hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProduct}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
