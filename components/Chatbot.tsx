"use client"

import type React from "react"
/* Removed import of 'web-speech-api' as it is a browser API and does not need to be imported */
import { useState, useRef, useEffect } from "react"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React, { forwardRef } from "react"
import { Input as OriginalInput } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Wrap Input with forwardRef to support ref forwarding
const Input = forwardRef<HTMLInputElement, React.ComponentProps<typeof OriginalInput>>((props, ref) => (
  <OriginalInput ref={ref} {...props} />
))
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
  const viewportRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const renderBold = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const content = part.slice(2, -2)
        return (
          <strong key={idx}>{content}</strong>
        )
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>
    })
  }

  const renderBasicMarkdown = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, i) => (
      <span key={i}>
        {renderBold(line)}
        {i < lines.length - 1 ? <br /> : null}
      </span>
    ))
  }

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

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
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

  // Scroll to bottom when new messages arrive if user is already at bottom
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isAtBottom])

  const onViewportScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget
    const threshold = 16
    const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - threshold
    setIsAtBottom(atBottom)
  }

  const scrollToBottom = () => {
    const el = viewportRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, language }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      return data.reply || "Sorry, I couldn't generate a response."
    } catch (error) {
      return t.errorMessage
    }
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
      const aiResponse = await getAIResponse(userMessage.text)

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

          <CardContent className="relative flex-1 flex flex-col p-0 min-h-0">
            {/* Messages */}
            <ScrollArea
              className="flex-1 min-h-0 p-4"
              viewportRef={viewportRef}
              onViewportScroll={onViewportScroll}
              viewportClassName="h-full"
            >
              <div className="space-y-4 pr-2">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg overflow-hidden ${
                        message.sender === "user" ? "bg-gradient-green text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm break-words whitespace-pre-wrap">{renderBasicMarkdown(message.text)}</p>
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

            {/* Scroll to bottom button */}
            {!isAtBottom && (
              <div className="absolute bottom-24 right-6">
                <Button size="sm" variant="secondary" onClick={scrollToBottom} className="shadow">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {language === "hi" ? "नीचे जाएँ" : "Scroll to bottom"}
                </Button>
              </div>
            )}

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
