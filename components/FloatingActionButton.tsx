"use client"

import { motion } from "framer-motion"
import { Plus, MessageCircle, ShoppingCart, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useApp } from "@/contexts/AppContext"

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser } = useApp()

  const actions = [
    {
      icon: MessageCircle,
      label: "AI Assistant",
      href: "/dashboard/ai-assistant",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: ShoppingCart,
      label: "Marketplace",
      href: "/marketplace",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: User,
      label: "Dashboard",
      href: "/dashboard",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div className="flex flex-col items-end space-y-3">
        {/* Action buttons */}
        {isOpen &&
          actions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${action.color} text-white p-3 rounded-full shadow-lg transition-colors flex items-center space-x-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <action.icon size={20} />
                  <span className="text-sm font-medium pr-1">{action.label}</span>
                </motion.button>
              </Link>
            </motion.div>
          ))}

        {/* Main FAB */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-green text-white p-4 rounded-full shadow-lg"
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  )
}
