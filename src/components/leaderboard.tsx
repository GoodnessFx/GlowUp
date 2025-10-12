import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Crown,
  Zap,
  Award,
  Calendar,
  Users
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const weeklyLeaders = [
  { rank: 1, username: "fashionista_queen", avatar: "", points: 2150, level: "Glow Master", badge: "Fashion Expert", helpedPeople: 45, streak: 12 },
  { rank: 2, username: "skincare_wizard", avatar: "", points: 1890, level: "Expert", badge: "Skincare Guru", helpedPeople: 38, streak: 8 },
  { rank: 3, username: "fitness_coach_mike", avatar: "", points: 1650, level: "Master", badge: "Fitness Pro", helpedPeople: 32, streak: 15 },
  { rank: 4, username: "style_advisor", avatar: "", points: 1420, level: "Expert", badge: "Style Guru", helpedPeople: 28, streak: 6 },
  { rank: 5, username: "beauty_enthusiast", avatar: "", points: 1280, level: "Stylist", badge: "Beauty Expert", helpedPeople: 25, streak: 4 }
]

const monthlyLeaders = [
  { rank: 1, username: "ultimate_helper", avatar: "", points: 8450, level: "Glow Master", badge: "Community Champion", helpedPeople: 156, streak: 28 },
  { rank: 2, username: "fashionista_queen", avatar: "", points: 7890, level: "Glow Master", badge: "Fashion Expert", helpedPeople: 142, streak: 25 },
  { rank: 3, username: "skincare_wizard", avatar: "", points: 7230, level: "Expert", badge: "Skincare Guru", helpedPeople: 134, streak: 22 }
]

const topCategories = [
  { category: "Fashion", leader: "fashionista_queen", points: 3450, color: "from-pink-400 to-purple-400" },
  { category: "Skincare", leader: "skincare_wizard", points: 2890, color: "from-yellow-400 to-orange-400" },
  { category: "Fitness", leader: "fitness_coach_mike", points: 2340, color: "from-green-400 to-blue-400" }
]

const getRankIcon = (rank) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-[#D4AF37]" />
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
  return <span className="text-lg font-bold text-gray-500">#{rank}</span>
}

const getRankBackground = (rank) => {
  if (rank === 1) return "from-[#1A1A1A] to-[#2C2C2C] border-[#D4AF37]/50"
  if (rank === 2) return "from-[#1A1A1A] to-[#2C2C2C] border-gray-400/40"
  if (rank === 3) return "from-[#1A1A1A] to-[#2C2C2C] border-amber-500/40"
  return "from-[#0A0A0A] to-[#1A1A1A] border-white/10"
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState("weekly")
  const currentLeaders = activeTab === "weekly" ? weeklyLeaders : monthlyLeaders

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-[#0A0A0A] text-white">
      {/* Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Trophy className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#E6C200] bg-clip-text text-transparent">
            GlowUp Leaderboard
          </h1>
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
            <Trophy className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>
        </div>
        <p className="text-lg text-gray-400">Celebrating our top helpers who make the community glow</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Active Helpers", value: "2,340", icon: <Users className="w-6 h-6 text-[#0A0A0A]" /> },
          { title: "Weekly Responses", value: "8,450", icon: <TrendingUp className="w-6 h-6 text-[#0A0A0A]" /> },
          { title: "Points Awarded", value: "125K", icon: <Zap className="w-6 h-6 text-[#0A0A0A]" /> }
        ].map((stat, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#E6C200] rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Leaderboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-[#D4AF37]/20 text-white font-medium py-3">
            <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" /> This Week
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-[#D4AF37]/20 text-white font-medium py-3">
            <Trophy className="w-4 h-4 mr-2 text-[#D4AF37]" /> This Month
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <AnimatePresence mode="wait">
            {currentLeaders.map((leader, index) => (
              <motion.div
                key={`${activeTab}-${leader.username}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="mb-4"
              >
                <Card className={`bg-gradient-to-r ${getRankBackground(leader.rank)} backdrop-blur-lg border rounded-xl transition-all duration-300`}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center">{getRankIcon(leader.rank)}</div>
                      <Avatar className="w-16 h-16 border-2 border-[#D4AF37]">
                        <AvatarImage src={leader.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-[#D4AF37] to-[#E6C200] text-xl text-black">
                          {leader.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white">{leader.username}</h3>
                          <Badge className="bg-[#D4AF37] text-[#0A0A0A] font-semibold px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-md hover:brightness-110 transition-all duration-300">
                            <Star className="w-3 h-3 text-[#0A0A0A]" /> {leader.level}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                          <span>{leader.badge}</span>
                          <span>•</span>
                          <span>{leader.helpedPeople} people helped</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#D4AF37]">
                            <Zap className="w-3 h-3" /> {leader.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E6C200] bg-clip-text text-transparent">
                        {leader.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Category Leaders */}
      <Card className="bg-[#111111] border border-[#D4AF37]/30 backdrop-blur-lg mb-12 rounded-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-[#D4AF37]" /> Category Champions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg hover:bg-[#1A1A1A] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                <div>
                  <h4 className="text-white font-semibold">{category.category}</h4>
                  <p className="text-sm text-gray-400">Leader: @{category.leader}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#D4AF37]">{category.points.toLocaleString()}</div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-[#111111] rounded-xl p-8 border border-[#D4AF37]/30"
      >
        <div className="text-4xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold text-white mb-2">Want to see your name here?</h2>
        <p className="text-gray-400 mb-6">
          Start helping others glow up and climb the leaderboard. Every response counts.
        </p>
        <Button className="bg-gradient-to-r from-[#D4AF37] to-[#E6C200] text-[#0A0A0A] font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 flex items-center justify-center">
          <Star className="w-4 h-4 mr-2 text-[#0A0A0A]" /> Start Helping Now
        </Button>
      </motion.div>
    </div>
  )
}
