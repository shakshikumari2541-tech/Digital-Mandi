"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, User, LogOut, Globe } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { currentUser, logout, cart, language, toggleLanguage } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    hi: {
      home: "होम",
      marketplace: "बाज़ार",
      dashboard: "डैशबोर्ड",
      login: "लॉगिन",
      logout: "लॉगआउट",
      cart: "कार्ट",
    },
    en: {
      home: "Home",
      marketplace: "Marketplace",
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      cart: "Cart",
    },
  }

  const t = translations[language]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">डि</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">Digital Mandi</span>
                <span className="text-xs text-muted-foreground -mt-1">डिजिटल मंडी</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                {t.home}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
                {t.marketplace}
              </Link>
            </motion.div>
            {currentUser && (
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  {t.dashboard}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4 mr-1" />
                {language.toUpperCase()}
              </Button>
            </motion.div>

            {currentUser?.role === "consumer" && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="w-4 h-4" />
                    {cart.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {cart.length}
                      </motion.span>
                    )}
                  </Button>
                </Link>
              </motion.div>
            )}

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-secondary rounded-lg"
                >
                  <User className="w-4 h-4 text-secondary-foreground" />
                  <span className="text-sm font-medium text-secondary-foreground">{currentUser.name}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button className="bg-gradient-green hover:opacity-90">{t.login}</Button>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="md:hidden">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: 0 }} animate={{ rotate: 180 }} exit={{ rotate: 0 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 180 }} animate={{ rotate: 0 }} exit={{ rotate: 180 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4">
                <div className="flex flex-col space-y-4">
                  {[
                    { href: "/", label: t.home },
                    { href: "/marketplace", label: t.marketplace },
                    ...(currentUser ? [{ href: "/dashboard", label: t.dashboard }] : []),
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors px-2 py-1 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between pt-4 border-t border-border"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleLanguage}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      {language.toUpperCase()}
                    </Button>

                    {currentUser?.role === "consumer" && (
                      <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="relative">
                          <ShoppingCart className="w-4 h-4" />
                          {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {cart.length}
                            </span>
                          )}
                        </Button>
                      </Link>
                    )}

                    {currentUser ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">{currentUser.name}</span>
                        <Button variant="ghost" size="sm" onClick={logout}>
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button size="sm" className="bg-gradient-green hover:opacity-90">
                          {t.login}
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
