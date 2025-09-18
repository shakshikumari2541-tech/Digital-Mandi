"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, ShoppingBag, User, Mail, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const { login, language, currentUser } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("farmer")

  const translations = {
    hi: {
      title: "Digital Mandi में लॉगिन करें",
      subtitle: "अपने खाते में प्रवेश करें",
      farmer: "किसान",
      consumer: "उपभोक्ता",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      login: "लॉगिन करें",
      error: "गलत ईमेल या भूमिका। कृपया पुनः प्रयास करें।",
      demoAccounts: "डेमो खाते:",
      farmerDemo: "किसान: ram@farmer.com",
      consumerDemo: "उपभोक्ता: priya@consumer.com",
      or: "या",
      quickLogin: "त्वरित लॉगिन",
    },
    en: {
      title: "Login to Digital Mandi",
      subtitle: "Access your account",
      farmer: "Farmer",
      consumer: "Consumer",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      login: "Login",
      error: "Invalid email or role. Please try again.",
      demoAccounts: "Demo Accounts:",
      farmerDemo: "Farmer: ram@farmer.com",
      consumerDemo: "Consumer: priya@consumer.com",
      or: "or",
      quickLogin: "Quick Login",
    },
  }

  const t = translations[language]

  useEffect(() => {
    // Redirect if already logged in
    if (currentUser) {
      router.push("/dashboard")
    }

    // Set tab based on URL parameter
    const role = searchParams.get("role")
    if (role === "farmer" || role === "consumer") {
      setActiveTab(role)
    }
  }, [currentUser, router, searchParams])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError(t.error)
      return
    }

    const success = login(email, activeTab as "farmer" | "consumer")
    if (success) {
      router.push("/dashboard")
    } else {
      setError(t.error)
    }
  }

  const handleQuickLogin = (demoEmail: string, role: "farmer" | "consumer") => {
    setActiveTab(role)
    setEmail(demoEmail)
    const success = login(demoEmail, role)
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-green-light">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">{t.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{t.subtitle}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="farmer" className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    {t.farmer}
                  </TabsTrigger>
                  <TabsTrigger value="consumer" className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {t.consumer}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="farmer" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full bg-gradient-green hover:opacity-90">
                      <Leaf className="w-4 h-4 mr-2" />
                      {t.login}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="consumer" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full bg-gradient-green hover:opacity-90">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t.login}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Demo Accounts Section */}
              <div className="pt-6 border-t border-border">
                <div className="text-center mb-4">
                  <span className="text-sm text-muted-foreground">{t.demoAccounts}</span>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleQuickLogin("ram@farmer.com", "farmer")}
                  >
                    <Leaf className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{t.farmerDemo}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleQuickLogin("priya@consumer.com", "consumer")}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{t.consumerDemo}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
