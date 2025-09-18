"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Chatbot, ChatbotButton } from "@/components/Chatbot"

export function GlobalChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  // Don't show chatbot button on login page or AI assistant page
  const shouldShowButton = !pathname.includes("/login") && !pathname.includes("/ai-assistant")

  if (!shouldShowButton) return null

  return (
    <>
      {!isChatOpen && <ChatbotButton onClick={() => setIsChatOpen(true)} />}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
