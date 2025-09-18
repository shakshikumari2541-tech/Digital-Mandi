"use client"

import { useApp } from "@/contexts/AppContext"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, ShoppingBag, TrendingUp, Leaf, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const { language } = useApp()

  const translations = {
    hi: {
      hero: {
        title: "किसानों को सीधे उपभोक्ताओं से जोड़ना",
        subtitle: "Digital Mandi - भारत का सबसे बड़ा कृषि मार्केटप्लेस",
        description: "ताज़ी फसल, उचित मूल्य, और AI की मदद से बेहतर व्यापार",
        farmerCta: "किसान के रूप में शुरू करें",
        consumerCta: "खरीदारी शुरू करें",
      },
      features: {
        title: "क्यों चुनें Digital Mandi?",
        direct: {
          title: "सीधा संपर्क",
          desc: "बिचौलियों को हटाकर किसानों से सीधे खरीदें",
        },
        fresh: {
          title: "ताज़ी फसल",
          desc: "खेत से सीधे आपके घर तक ताज़ी फसल",
        },
        ai: {
          title: "AI सहायता",
          desc: "बेहतर मूल्य निर्धारण और सलाह के लिए AI का उपयोग",
        },
      },
      stats: {
        farmers: "पंजीकृत किसान",
        products: "उत्पाद उपलब्ध",
        orders: "सफल ऑर्डर",
      },
    },
    en: {
      hero: {
        title: "Connecting Farmers Directly with Consumers",
        subtitle: "Digital Mandi - India's Largest Agricultural Marketplace",
        description: "Fresh produce, fair prices, and better trade with AI assistance",
        farmerCta: "Start as Farmer",
        consumerCta: "Start Shopping",
      },
      features: {
        title: "Why Choose Digital Mandi?",
        direct: {
          title: "Direct Connection",
          desc: "Buy directly from farmers, eliminating middlemen",
        },
        fresh: {
          title: "Fresh Produce",
          desc: "Farm-fresh products delivered straight to your home",
        },
        ai: {
          title: "AI Assistance",
          desc: "Smart pricing and recommendations powered by AI",
        },
      },
      stats: {
        farmers: "Registered Farmers",
        products: "Products Available",
        orders: "Successful Orders",
      },
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-green-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">{t.hero.title}</h1>
                <p className="text-xl text-primary font-semibold">{t.hero.subtitle}</p>
                <p className="text-lg text-muted-foreground text-pretty">{t.hero.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login?role=farmer">
                  <Button size="lg" className="bg-gradient-green hover:opacity-90 w-full sm:w-auto">
                    <Leaf className="w-5 h-5 mr-2" />
                    {t.hero.farmerCta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login?role=consumer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {t.hero.consumerCta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop"
                  alt="Farmers in field"
                  className="rounded-2xl shadow-2xl animate-float"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-green opacity-20 rounded-2xl transform rotate-3"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-muted-foreground">{t.stats.farmers}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">{t.stats.products}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">{t.stats.orders}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.features.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow card-3d">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{t.features.direct.title}</h3>
                  <p className="text-muted-foreground">{t.features.direct.desc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow card-3d">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{t.features.fresh.title}</h3>
                  <p className="text-muted-foreground">{t.features.fresh.desc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow card-3d">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{t.features.ai.title}</h3>
                  <p className="text-muted-foreground">{t.features.ai.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-balance">
              {language === "hi" ? "आज ही Digital Mandi से जुड़ें" : "Join Digital Mandi Today"}
            </h2>
            <p className="text-xl text-green-100 text-pretty">
              {language === "hi"
                ? "भारत के सबसे बड़े कृषि मार्केटप्लेस का हिस्सा बनें"
                : "Be part of India's largest agricultural marketplace"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {language === "hi" ? "मार्केटप्लेस देखें" : "Explore Marketplace"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
