"use client"

import type React from "react"
import type { SpeechRecognition } from "web-speech-api"
import { useState, useRef, useEffect } from "react"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Mic, MicOff, X, MessageCircle, Languages } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  language: "hi" | "en"
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const { currentUser, language, toggleLanguage } = useApp()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const translations = {
    hi: {
      title: "AI सहायक",
      subtitle: "मैं आपकी कृषि संबंधी मदद के लिए यहाँ हूँ",
      placeholder: "अपना सवाल पूछें...",
      send: "भेजें",
      listening: "सुन रहा हूँ...",
      startVoice: "आवाज़ से बोलें",
      stopVoice: "आवाज़ बंद करें",
      welcomeMessage:
        "नमस्ते! मैं Digital Mandi का AI सहायक हूँ। मैं आपकी कृषि, मूल्य निर्धारण, और बाज़ार संबंधी सभी सवालों में मदद कर सकता हूँ।",
      errorMessage: "क्षमा करें, कुछ गलत हुआ है। कृपया दोबारा कोशिश करें।",
      voiceNotSupported: "आपका ब्राउज़र आवाज़ पहचान का समर्थन नहीं करता।",
    },
    en: {
      title: "AI Assistant",
      subtitle: "I'm here to help with your farming needs",
      placeholder: "Ask me anything...",
      send: "Send",
      listening: "Listening...",
      startVoice: "Start voice input",
      stopVoice: "Stop voice input",
      welcomeMessage:
        "Hello! I'm Digital Mandi's AI assistant. I can help you with farming advice, pricing suggestions, market trends, and any questions about agriculture.",
      errorMessage: "Sorry, something went wrong. Please try again.",
      voiceNotSupported: "Your browser doesn't support speech recognition.",
    },
  }

  const t = translations[language]

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = language === "hi" ? "hi-IN" : "en-US"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [language])

  // Add welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: t.welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
        language,
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, t.welcomeMessage, language])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Mock AI responses based on keywords and context
    const lowerMessage = userMessage.toLowerCase()

    const responses = {
      hi: {
        greeting: [
          "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
          "आपका स्वागत है! कृषि संबंधी कोई भी सवाल पूछें।",
          "हैलो! मैं यहाँ आपकी सहायता के लिए हूँ।",
        ],
        pricing: [
          "मूल्य निर्धारण के लिए, मैं बाज़ार की मांग, मौसम, और गुणवत्ता के आधार पर सुझाव देता हूँ। आपका कौन सा उत्पाद है?",
          "सही मूल्य के लिए उत्पाद की गुणवत्ता, मात्रा, और स्थानीय बाज़ार की जांच करें।",
          "AI के आधार पर, जैविक उत्पादों का मूल्य 20-30% अधिक हो सकता है।",
        ],
        farming: [
          "कृषि में सफलता के लिए सही बीज, उर्वरक, और पानी का प्रबंधन जरूरी है।",
          "मौसम के अनुसार फसल चुनें और जैविक खाद का उपयोग करें।",
          "नई तकनीक और AI का उपयोग करके अपनी फसल की गुणवत्ता बढ़ाएं।",
        ],
        market: [
          "Digital Mandi में आप सीधे उपभोक्ताओं से जुड़ सकते हैं और बेहतर मूल्य पा सकते हैं।",
          "बाज़ार की मांग के अनुसार अपने उत्पाद की मार्केटिंग करें।",
          "ऑनलाइन प्लेटफॉर्म का उपयोग करके अपनी पहुंच बढ़ाएं।",
        ],
        default: [
          "यह एक दिलचस्प सवाल है! कृषि के बारे में और बताएं।",
          "मैं आपकी मदद करने की कोशिश करूंगा। कृपया अधिक विवरण दें।",
          "Digital Mandi के बारे में कोई और सवाल है?",
        ],
      },
      en: {
        greeting: [
          "Hello! How can I help you today?",
          "Welcome! Feel free to ask any farming-related questions.",
          "Hi there! I'm here to assist you with your agricultural needs.",
        ],
        pricing: [
          "For pricing suggestions, I consider market demand, weather conditions, and product quality. What product are you selling?",
          "To get the right price, check product quality, quantity, and local market conditions.",
          "Based on AI analysis, organic products can be priced 20-30% higher than conventional ones.",
        ],
        farming: [
          "Successful farming requires proper seed selection, fertilizer management, and water conservation.",
          "Choose crops according to the season and use organic fertilizers for better results.",
          "Leverage new technology and AI to improve your crop quality and yield.",
        ],
        market: [
          "Digital Mandi connects you directly with consumers, helping you get better prices.",
          "Market your products according to consumer demand and seasonal trends.",
          "Use online platforms to expand your reach and increase sales.",
        ],
        default: [
          "That's an interesting question! Tell me more about your farming needs.",
          "I'll try to help you with that. Could you provide more details?",
          "Do you have any other questions about Digital Mandi?",
        ],
      },
    }

    const currentResponses = responses[language]

    // Determine response category based on keywords
    let category = "default"
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("नमस्ते")) {
      category = "greeting"
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("मूल्य") ||
      lowerMessage.includes("दाम")
    ) {
      category = "pricing"
    } else if (
      lowerMessage.includes("farm") ||
      lowerMessage.includes("crop") ||
      lowerMessage.includes("कृषि") ||
      lowerMessage.includes("फसल")
    ) {
      category = "farming"
    } else if (
      lowerMessage.includes("market") ||
      lowerMessage.includes("sell") ||
      lowerMessage.includes("बाज़ार") ||
      lowerMessage.includes("बेचना")
    ) {
      category = "market"
    }

    const categoryResponses = currentResponses[category as keyof typeof currentResponses]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
      language,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiResponse = await generateAIResponse(userMessage.text)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
        language,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t.errorMessage,
        sender: "bot",
        timestamp: new Date(),
        language,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = () => {
    if (!recognition) {
      alert(t.voiceNotSupported)
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 w-96 h-[600px] z-50 shadow-2xl"
      >
        <Card className="h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-green text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{t.title}</CardTitle>
                <p className="text-sm text-green-100">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Languages className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-gradient-green text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              {isListening && (
                <div className="mb-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    <Mic className="w-3 h-3 mr-1" />
                    {t.listening}
                  </Badge>
                </div>
              )}

              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    disabled={isLoading}
                    className="pr-12"
                  />
                  {recognition && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceInput}
                      className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                        isListening ? "text-red-600 hover:text-red-700" : "text-muted-foreground"
                      }`}
                      title={isListening ? t.stopVoice : t.startVoice}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-green hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

// Floating chat button
export function ChatbotButton({ onClick }: { onClick: () => void }) {
  const { language } = useApp()

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-gradient-green hover:opacity-90 shadow-lg animate-pulse-green"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </motion.div>
  )
}
