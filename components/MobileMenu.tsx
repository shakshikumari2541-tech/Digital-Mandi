"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, ShoppingCart, MessageCircle, User, LogOut } from "lucide-react"
import { useAppContext } from "@/contexts/AppContext"
import Link from "next/link"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, language, translations } = useAppContext()

  const menuItems = [
    { icon: Home, label: translations.home, href: "/" },
    { icon: ShoppingCart, label: translations.marketplace, href: "/marketplace" },
    { icon: MessageCircle, label: translations.aiAssistant, href: "/dashboard/ai-assistant" },
    { icon: User, label: translations.dashboard, href: "/dashboard" },
  ]

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:text-green-600 transition-colors">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">{translations.menu}</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600 hover:text-green-600">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <item.icon size={20} className="text-green-600" />
                      <span className="text-gray-700">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {user && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut size={20} className="text-red-600" />
                    <span className="text-red-700">{translations.logout}</span>
                  </motion.button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
