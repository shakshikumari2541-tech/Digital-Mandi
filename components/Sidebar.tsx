"use client"

import { useApp } from "@/contexts/AppContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Plus,
  Package,
  Gift,
  Bot,
  ShoppingCart,
  History,
  BarChart3,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { currentUser, language } = useApp()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const translations = {
    hi: {
      farmer: {
        dashboard: "डैशबोर्ड",
        addProduct: "उत्पाद जोड़ें",
        myProducts: "मेरे उत्पाद",
        rewards: "पुरस्कार",
        aiAssistant: "AI सहायक",
        analytics: "विश्लेषण",
        settings: "सेटिंग्स",
      },
      consumer: {
        dashboard: "डैशबोर्ड",
        marketplace: "बाज़ार",
        cart: "कार्ट",
        orders: "ऑर्डर",
        aiAssistant: "AI सहायक",
        settings: "सेटिंग्स",
      },
    },
    en: {
      farmer: {
        dashboard: "Dashboard",
        addProduct: "Add Product",
        myProducts: "My Products",
        rewards: "Rewards",
        aiAssistant: "AI Assistant",
        analytics: "Analytics",
        settings: "Settings",
      },
      consumer: {
        dashboard: "Dashboard",
        marketplace: "Marketplace",
        cart: "Cart",
        orders: "Orders",
        aiAssistant: "AI Assistant",
        settings: "Settings",
      },
    },
  }

  if (!currentUser) return null

  const t = translations[language][currentUser.role]

  const farmerNavItems = [
    { href: "/dashboard", label: t.dashboard, icon: Home },
    { href: "/dashboard/add-product", label: t.addProduct, icon: Plus },
    { href: "/dashboard/products", label: t.myProducts, icon: Package },
    { href: "/dashboard/rewards", label: t.rewards, icon: Gift },
    { href: "/dashboard/ai-assistant", label: t.aiAssistant, icon: Bot },
    { href: "/dashboard/analytics", label: t.analytics, icon: BarChart3 },
    { href: "/dashboard/settings", label: t.settings, icon: Settings },
  ]

  const consumerNavItems = [
    { href: "/dashboard", label: t.dashboard, icon: Home },
    { href: "/marketplace", label: t.marketplace, icon: ShoppingCart },
    { href: "/cart", label: t.cart, icon: ShoppingCart },
    { href: "/dashboard/orders", label: t.orders, icon: History },
    { href: "/dashboard/ai-assistant", label: t.aiAssistant, icon: Bot },
    { href: "/dashboard/settings", label: t.settings, icon: Settings },
  ]

  const navItems = currentUser.role === "farmer" ? farmerNavItems : consumerNavItems

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">डि</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sidebar-foreground text-sm">Digital Mandi</span>
              <span className="text-xs text-sidebar-foreground/60 capitalize">{currentUser.role}</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  isCollapsed && "px-2",
                )}
              >
                <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{currentUser.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
