"use client"

import { useState } from "react"

export function useChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const toggleChat = () => setIsChatOpen(!isChatOpen)

  return {
    isChatOpen,
    openChat,
    closeChat,
    toggleChat,
  }
}
