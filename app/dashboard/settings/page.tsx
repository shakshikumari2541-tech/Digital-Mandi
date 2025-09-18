"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Bell, Globe, Shield, Mail, MapPin, Phone, Save, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { currentUser, language, toggleLanguage } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      contactVisible: false,
      activityVisible: true,
    },
    preferences: {
      language: language,
      currency: "INR",
      timezone: "Asia/Kolkata",
    },
  })

  const translations = {
    hi: {
      title: "सेटिंग्स",
      subtitle: "अपनी प्राथमिकताएं और खाता सेटिंग्स प्रबंधित करें",
      profile: "प्रोफ़ाइल जानकारी",
      notifications: "सूचनाएं",
      privacy: "गोपनीयता",
      preferences: "प्राथमिकताएं",
      account: "खाता सेटिंग्स",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन नंबर",
      location: "स्थान",
      emailNotifications: "ईमेल सूचनाएं",
      smsNotifications: "SMS सूचनाएं",
      pushNotifications: "पुश सूचनाएं",
      marketingEmails: "मार्केटिंग ईमेल",
      profileVisible: "प्रोफ़ाइल दृश्यमान",
      contactVisible: "संपर्क जानकारी दृश्यमान",
      activityVisible: "गतिविधि दृश्यमान",
      language: "भाषा",
      currency: "मुद्रा",
      timezone: "समय क्षेत्र",
      save: "सहेजें",
      saved: "सहेजा गया!",
      hindi: "हिंदी",
      english: "अंग्रेजी",
    },
    en: {
      title: "Settings",
      subtitle: "Manage your preferences and account settings",
      profile: "Profile Information",
      notifications: "Notifications",
      privacy: "Privacy",
      preferences: "Preferences",
      account: "Account Settings",
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      location: "Location",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      pushNotifications: "Push Notifications",
      marketingEmails: "Marketing Emails",
      profileVisible: "Profile Visible",
      contactVisible: "Contact Info Visible",
      activityVisible: "Activity Visible",
      language: "Language",
      currency: "Currency",
      timezone: "Timezone",
      save: "Save Changes",
      saved: "Saved!",
      hindi: "Hindi",
      english: "English",
    },
  }

  if (!currentUser) {
    return <div>Access denied</div>
  }

  const t = translations[language]

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {saved && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{t.saved}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.profile}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t.location}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={settings.location}
                      onChange={(e) => setSettings((prev) => ({ ...prev, location: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t.notifications}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.emailNotifications}</Label>
                    <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.smsNotifications}</Label>
                    <p className="text-sm text-muted-foreground">Receive SMS alerts for important updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => updateSetting("notifications", "sms", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.pushNotifications}</Label>
                    <p className="text-sm text-muted-foreground">Get push notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.marketingEmails}</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => updateSetting("notifications", "marketing", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t.privacy}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.profileVisible}</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => updateSetting("privacy", "profileVisible", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.contactVisible}</Label>
                    <p className="text-sm text-muted-foreground">Show contact information publicly</p>
                  </div>
                  <Switch
                    checked={settings.privacy.contactVisible}
                    onCheckedChange={(checked) => updateSetting("privacy", "contactVisible", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t.activityVisible}</Label>
                    <p className="text-sm text-muted-foreground">Show your activity status</p>
                  </div>
                  <Switch
                    checked={settings.privacy.activityVisible}
                    onCheckedChange={(checked) => updateSetting("privacy", "activityVisible", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t.preferences}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t.language}</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updateSetting("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hi">{t.hindi}</SelectItem>
                      <SelectItem value="en">{t.english}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.currency}</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => updateSetting("preferences", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.timezone}</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => updateSetting("preferences", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="Asia/Mumbai">Asia/Mumbai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-end"
        >
          <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-green hover:opacity-90">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
