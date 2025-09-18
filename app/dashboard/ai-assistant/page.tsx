"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Chatbot } from "@/components/Chatbot"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Mic, Languages, Sparkles, TrendingUp, Leaf, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

export default function AIAssistantPage() {
  const { currentUser, language } = useApp()
  const [isChatOpen, setIsChatOpen] = useState(true)

  const translations = {
    hi: {
      title: "AI सहायक",
      subtitle: "आपका व्यक्तिगत कृषि सलाहकार",
      features: "विशेषताएं",
      quickHelp: "त्वरित सहायता",
      startChat: "चैट शुरू करें",
      voiceInput: "आवाज़ से बात करें",
      multiLanguage: "बहुभाषी समर्थन",
      smartAdvice: "स्मार्ट सलाह",
      capabilities: {
        pricing: {
          title: "मूल्य सुझाव",
          desc: "AI के आधार पर सबसे अच्छे मूल्य की सलाह",
        },
        farming: {
          title: "कृषि सलाह",
          desc: "फसल, मिट्टी, और मौसम संबंधी जानकारी",
        },
        market: {
          title: "बाज़ार की जानकारी",
          desc: "मांग, ट्रेंड्स, और बिक्री की रणनीति",
        },
        support: {
          title: "24/7 सहायता",
          desc: "किसी भी समय सवाल पूछें और जवाब पाएं",
        },
      },
      quickQuestions: {
        title: "आम सवाल",
        questions: [
          "मेरे टमाटर का सही मूल्य क्या होना चाहिए?",
          "जैविक खेती कैसे शुरू करूं?",
          "बाज़ार में मांग कैसे बढ़ाऊं?",
          "फसल की गुणवत्ता कैसे सुधारूं?",
        ],
      },
    },
    en: {
      title: "AI Assistant",
      subtitle: "Your personal agricultural advisor",
      features: "Features",
      quickHelp: "Quick Help",
      startChat: "Start Chat",
      voiceInput: "Voice Input",
      multiLanguage: "Multi-language",
      smartAdvice: "Smart Advice",
      capabilities: {
        pricing: {
          title: "Price Suggestions",
          desc: "AI-powered pricing recommendations for your products",
        },
        farming: {
          title: "Farming Advice",
          desc: "Expert guidance on crops, soil, and weather conditions",
        },
        market: {
          title: "Market Insights",
          desc: "Demand trends, market analysis, and sales strategies",
        },
        support: {
          title: "24/7 Support",
          desc: "Get instant answers to your questions anytime",
        },
      },
      quickQuestions: {
        title: "Common Questions",
        questions: [
          "What should be the right price for my tomatoes?",
          "How do I start organic farming?",
          "How can I increase market demand?",
          "How to improve crop quality?",
        ],
      },
    },
  }

  if (!currentUser) {
    return <div>Access denied</div>
  }

  const t = translations[language]

  const capabilities = [
    {
      icon: TrendingUp,
      title: t.capabilities.pricing.title,
      description: t.capabilities.pricing.desc,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Leaf,
      title: t.capabilities.farming.title,
      description: t.capabilities.farming.desc,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: ShoppingCart,
      title: t.capabilities.market.title,
      description: t.capabilities.market.desc,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Bot,
      title: t.capabilities.support.title,
      description: t.capabilities.support.desc,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-green rounded-full flex items-center justify-center mx-auto">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex justify-center gap-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <Mic className="w-3 h-3 mr-1" />
              {t.voiceInput}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Languages className="w-3 h-3 mr-1" />
              {t.multiLanguage}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              <Sparkles className="w-3 h-3 mr-1" />
              {t.smartAdvice}
            </Badge>
          </div>
        </div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-green-light border-green-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-4">{t.quickHelp}</h2>
              <p className="text-muted-foreground mb-6">
                {language === "hi"
                  ? "AI सहायक से बात करें और अपनी कृषि संबंधी समस्याओं का समाधान पाएं"
                  : "Chat with our AI assistant to get solutions for your farming challenges"}
              </p>
              <Button onClick={() => setIsChatOpen(true)} className="bg-gradient-green hover:opacity-90" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.startChat}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {t.features}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${capability.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{capability.title}</h3>
                        <p className="text-sm text-muted-foreground">{capability.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t.quickQuestions.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {t.quickQuestions.questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 bg-transparent"
                      onClick={() => setIsChatOpen(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
