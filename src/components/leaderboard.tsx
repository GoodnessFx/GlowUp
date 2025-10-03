import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp, Crown, Zap, Award, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

const weeklyLeaders = [
  {
    rank: 1,
    username: 'fashionista_queen',
    avatar: '',
    points: 2150,
    level: 'Glow Master',
    badge: 'Fashion Expert',
    helpedPeople: 45,
    streak: 12
  },
  {
    rank: 2,
    username: 'skincare_wizard',
    avatar: '',
    points: 1890,
    level: 'Expert',
    badge: 'Skincare Guru',
    helpedPeople: 38,
    streak: 8
  },
  {
    rank: 3,
    username: 'fitness_coach_mike',
    avatar: '',
    points: 1650,
    level: 'Master',
    badge: 'Fitness Pro',
    helpedPeople: 32,
    streak: 15
  },
  {
    rank: 4,
    username: 'style_advisor',
    avatar: '',
    points: 1420,
    level: 'Expert',
    badge: 'Style Guru',
    helpedPeople: 28,
    streak: 6
  },
  {
    rank: 5,
    username: 'beauty_enthusiast',
    avatar: '',
    points: 1280,
    level: 'Stylist',
    badge: 'Beauty Expert',
    helpedPeople: 25,
    streak: 4
  }
];

const monthlyLeaders = [
  {
    rank: 1,
    username: 'ultimate_helper',
    avatar: '',
    points: 8450,
    level: 'Glow Master',
    badge: 'Community Champion',
    helpedPeople: 156,
    streak: 28
  },
  {
    rank: 2,
    username: 'fashionista_queen',
    avatar: '',
    points: 7890,
    level: 'Glow Master',
    badge: 'Fashion Expert',
    helpedPeople: 142,
    streak: 25
  },
  {
    rank: 3,
    username: 'skincare_wizard',
    avatar: '',
    points: 7230,
    level: 'Expert',
    badge: 'Skincare Guru',
    helpedPeople: 134,
    streak: 22
  }
];

const topCategories = [
  { category: 'Fashion', leader: 'fashionista_queen', points: 3450, color: 'from-pink-500 to-purple-500' },
  { category: 'Skincare', leader: 'skincare_wizard', points: 2890, color: 'from-yellow-500 to-orange-500' },
  { category: 'Fitness', leader: 'fitness_coach_mike', points: 2340, color: 'from-green-500 to-blue-500' }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-300" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
  }
};

const getRankBackground = (rank: number) => {
  switch (rank) {
    case 1:
      return 'from-yellow-500/20 to-orange-500/20 border-yellow-400/50';
    case 2:
      return 'from-gray-500/20 to-slate-500/20 border-gray-400/50';
    case 3:
      return 'from-amber-500/20 to-orange-500/20 border-amber-400/50';
    default:
      return 'from-black/20 to-purple-900/20 border-white/10';
  }
};

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('weekly');

  const currentLeaders = activeTab === 'weekly' ? weeklyLeaders : monthlyLeaders;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GlowUp Leaderboard
          </h1>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>
        <p className="text-xl text-gray-300">
          Celebrating our top helpers who make the community glow ✨
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {[
          { title: 'Active Helpers', value: '2,340', icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
          { title: 'Weekly Responses', value: '8,450', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
          { title: 'Points Awarded', value: '125K', icon: <Zap className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-400/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Leaderboard Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 mb-6">
            <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-500/20">
              <Calendar className="w-4 h-4 mr-2" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-500/20">
              <Trophy className="w-4 h-4 mr-2" />
              This Month
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {currentLeaders.map((leader, index) => (
                  <motion.div
                    key={`${activeTab}-${leader.username}`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className={`bg-gradient-to-r ${getRankBackground(leader.rank)} backdrop-blur-lg transition-all duration-300 hover:shadow-xl`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12">
                              {getRankIcon(leader.rank)}
                            </div>
                            
                            <Avatar className="w-16 h-16 border-2 border-purple-400">
                              <AvatarImage src={leader.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xl">
                                {leader.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white">{leader.username}</h3>
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  <Star className="w-3 h-3 mr-1" />
                                  {leader.level}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-300">
                                <span>{leader.badge}</span>
                                <span>•</span>
                                <span>{leader.helpedPeople} people helped</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-orange-400" />
                                  {leader.streak} day streak
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {leader.points.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-400">points</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Category Leaders */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              Category Champions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/10 rounded-lg hover:bg-black/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                  <div>
                    <h4 className="text-white font-semibold">{category.category}</h4>
                    <p className="text-sm text-gray-400">Leader: @{category.leader}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{category.points.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-400/20"
      >
        <div className="text-4xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold text-white mb-2">Want to see your name here?</h2>
        <p className="text-gray-300 mb-6">
          Start helping others glow up and climb the leaderboard! Every response counts.
        </p>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Star className="w-4 h-4 mr-2" />
          Start Helping Now
        </Button>
      </motion.div>
    </div>
  );
}