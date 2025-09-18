import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalChatbot } from "@/components/GlobalChatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Mandi - डिजिटल मंडी",
  description: "Connect farmers directly with consumers - किसानों को सीधे उपभोक्ताओं से जोड़ना",
  icons:{
    icon:'/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppProvider>
            {children}
            <GlobalChatbot />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
