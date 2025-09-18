"use client"

import { useApp } from "@/contexts/AppContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Star, Trophy, Zap, Calendar, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function RewardsPage() {
  const { currentUser, rewards, language } = useApp()

  const translations = {
    hi: {
      title: "पुरस्कार और अंक",
      subtitle: "अपने पुरस्कार अंक देखें और रिडीम करें",
      totalPoints: "कुल अंक",
      availableRewards: "उपलब्ध पुरस्कार",
      recentActivity: "हाल की गतिविधि",
      redeem: "रिडीम करें",
      pointsNeeded: "अंक चाहिए",
      earnMore: "और अंक कमाएं",
      noActivity: "कोई गतिविधि नहीं",
      startEarning: "अंक कमाना शुरू करें",
      rewardTypes: {
        sale_bonus: "बिक्री बोनस",
        product_added: "उत्पाद जोड़ा गया",
        quality_bonus: "गुणवत्ता बोनस",
        loyalty_reward: "वफादारी पुरस्कार",
      },
      rewardItems: {
        fertilizer: "मुफ्त जैविक खाद",
        seeds: "प्रीमियम बीज",
        tools: "कृषि उपकरण",
        consultation: "विशेषज्ञ सलाह",
      },
    },
    en: {
      title: "Rewards & Points",
      subtitle: "View and redeem your reward points",
      totalPoints: "Total Points",
      availableRewards: "Available Rewards",
      recentActivity: "Recent Activity",
      redeem: "Redeem",
      pointsNeeded: "Points Needed",
      earnMore: "Earn More Points",
      noActivity: "No activity yet",
      startEarning: "Start earning points",
      rewardTypes: {
        sale_bonus: "Sale Bonus",
        product_added: "Product Added",
        quality_bonus: "Quality Bonus",
        loyalty_reward: "Loyalty Reward",
      },
      rewardItems: {
        fertilizer: "Free Organic Fertilizer",
        seeds: "Premium Seeds",
        tools: "Farming Tools",
        consultation: "Expert Consultation",
      },
    },
  }

  if (!currentUser || currentUser.role !== "farmer") {
    return <div>Access denied</div>
  }

  const t = translations[language]

  const userRewards = rewards.filter((r) => r.farmerId === currentUser.id)
  const totalPoints = userRewards.reduce((sum, r) => sum + r.points, 0)

  const availableRewards = [
    {
      id: "fertilizer",
      name: t.rewardItems.fertilizer,
      points: 100,
      icon: Zap,
      description: "5kg organic fertilizer package",
    },
    {
      id: "seeds",
      name: t.rewardItems.seeds,
      points: 200,
      icon: Star,
      description: "High-quality vegetable seeds",
    },
    {
      id: "tools",
      name: t.rewardItems.tools,
      points: 500,
      icon: Trophy,
      description: "Professional farming tools set",
    },
    {
      id: "consultation",
      name: t.rewardItems.consultation,
      points: 300,
      icon: Award,
      description: "1-hour expert consultation",
    },
  ]

  return (
    <div className="p-6 space-y-8">
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

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gradient-green text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">{t.totalPoints}</CardTitle>
                <Gift className="h-4 w-4 text-green-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalPoints}</div>
                <p className="text-xs text-green-100">Available for redemption</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userRewards.length * 15}</div>
                <p className="text-xs text-muted-foreground">Points earned</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{100 - (totalPoints % 100)}</div>
                <p className="text-xs text-muted-foreground">Points to next reward</p>
                <Progress value={totalPoints % 100} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Available Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                {t.availableRewards}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward, index) => {
                  const Icon = reward.icon
                  const canRedeem = totalPoints >= reward.points

                  return (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-green-light rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{reward.name}</h4>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={canRedeem ? "default" : "secondary"}>
                              {reward.points} {language === "hi" ? "अंक" : "points"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={canRedeem ? "default" : "outline"}
                        size="sm"
                        disabled={!canRedeem}
                        className={canRedeem ? "bg-gradient-green hover:opacity-90" : "bg-transparent"}
                      >
                        {canRedeem ? t.redeem : `${reward.points - totalPoints} ${t.pointsNeeded}`}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t.recentActivity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRewards.length > 0 ? (
                <div className="space-y-4">
                  {userRewards.slice(0, 5).map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{reward.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(reward.earnedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        +{reward.points} {language === "hi" ? "अंक" : "points"}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">{t.noActivity}</p>
                  <Button className="bg-gradient-green hover:opacity-90">{t.startEarning}</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
