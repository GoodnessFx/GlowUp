import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Heart, MessageCircle, Calendar, Edit, Trophy, Zap, Target, Link as LinkIcon, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface UserProfileProps {
  user: any;
}

const achievements = [
  { id: 1, name: 'First GlowUp', description: 'Posted your first request', icon: '✨', unlocked: true },
  { id: 2, name: 'Helper', description: 'Helped 5 people glow up', icon: '🤝', unlocked: true },
  { id: 3, name: 'Style Guru', description: 'Got 50 upvotes on responses', icon: '👑', unlocked: true },
  { id: 4, name: 'Trendsetter', description: 'Posted a viral request', icon: '🔥', unlocked: false },
  { id: 5, name: 'Community Champion', description: 'Helped 100 people', icon: '🏆', unlocked: false },
  { id: 6, name: 'Glow Master', description: 'Reached max level', icon: '🌟', unlocked: false }
];

const recentActivity = [
  {
    id: 1,
    type: 'response',
    content: 'Recommended Adidas Stan Smiths for daily wear',
    points: 15,
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'upvote',
    content: 'Your skincare routine recommendation got upvoted',
    points: 5,
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'request',
    content: 'Posted "Need winter coat under $200"',
    points: 10,
    time: '1 day ago'
  },
  {
    id: 4,
    type: 'achievement',
    content: 'Unlocked "Style Guru" achievement',
    points: 50,
    time: '2 days ago'
  }
];

const stats = {
  totalPoints: 1250,
  level: 8,
  nextLevelPoints: 1500,
  totalEarnings: 87.50,
  helpedPeople: 23,
  responsesGiven: 45,
  upvotesReceived: 156,
  requestsPosted: 8
};

const levelTitles = {
  1: 'Newbie',
  2: 'Explorer',
  3: 'Helper',
  4: 'Advisor',
  5: 'Stylist',
  6: 'Expert',
  7: 'Guru',
  8: 'Master',
  9: 'Legend',
  10: 'Glow Master'
};

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const referralCode = user?.referralCode || 'GLOWUP';
  const referralLink = `${window.location.origin}?ref=${referralCode}`;
  const [referrals, setReferrals] = useState<{ email: string; joinedAt: string; reward: number }[]>(() => {
    // Dummy referrals list stored locally
    const stored = localStorage.getItem('glowup:referrals');
    return stored ? JSON.parse(stored) : [
      { email: 'friend1@example.com', joinedAt: '2025-09-15', reward: 5 },
      { email: 'friend2@example.com', joinedAt: '2025-09-28', reward: 5 }
    ];
  });
  const totalReferralEarnings = referrals.reduce((sum, r) => sum + r.reward, 0);
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const v = localStorage.getItem('glowup:wallet');
    return v ? parseFloat(v) : 0;
  });

  const simulatePayout = () => {
    const newBalance = walletBalance + totalReferralEarnings;
    setWalletBalance(newBalance);
    localStorage.setItem('glowup:wallet', newBalance.toString());
  };
  
  const progressToNextLevel = ((stats.totalPoints - (stats.level - 1) * 150) / 150) * 100;
  const currentLevelTitle = levelTitles[stats.level as keyof typeof levelTitles] || 'Master';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg border-purple-400/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-purple-400">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-2xl">
                    {user?.user_metadata?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2"
                >
                  <Trophy className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <h1 className="text-3xl font-bold text-white">
                    {user?.user_metadata?.username || user?.email?.split('@')[0]}
                  </h1>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Level {stats.level} {currentLevelTitle}
                  </Badge>
                </div>
                
                <p className="text-gray-300 mb-4">
                  🌟 Helping others glow up since joining GlowUp • Fashion & Skincare enthusiast
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Progress to Level {stats.level + 1}</span>
                    <span className="text-purple-400 font-medium">
                      {stats.totalPoints} / {stats.nextLevelPoints} points
                    </span>
                  </div>
                  <Progress 
                    value={progressToNextLevel} 
                    className="h-2 bg-black/20"
                  />
                </div>
              </div>

              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Points', value: stats.totalPoints.toLocaleString(), icon: <Zap className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500' },
          { label: 'People Helped', value: stats.helpedPeople, icon: <Heart className="w-5 h-5" />, color: 'from-pink-500 to-red-500' },
          { label: 'Earnings', value: `$${stats.totalEarnings}`, icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
          { label: 'Upvotes', value: stats.upvotesReceived, icon: <Award className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-400/30 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Referral Program */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-400" />
              Earn by Referring Friends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <div className="text-sm text-gray-300 mb-1">Your referral link</div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-[#1B1D22] border border-white/10">
                  <LinkIcon className="w-4 h-4 text-blue-400" />
                  <span className="truncate text-gray-200">{referralLink}</span>
                </div>
              </div>
              <Button
                onClick={() => { navigator.clipboard.writeText(referralLink); }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Copy Link
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-black/10 border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{referrals.length}</div>
                  <div className="text-sm text-gray-400">Referrals</div>
                </CardContent>
              </Card>
              <Card className="bg-black/10 border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">${totalReferralEarnings.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Earnings</div>
                </CardContent>
              </Card>
              <Card className="bg-black/10 border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">${walletBalance.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Wallet</div>
                </CardContent>
              </Card>
            </div>

            <div className="text-sm text-gray-400">You earn $5 for each friend who joins. Payouts are simulated in demo mode.</div>

            <div>
              <Button onClick={simulatePayout} className="bg-blue-600 hover:bg-blue-700">
                Transfer Earnings to Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500/20">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-500/20">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Responses Given', value: stats.responsesGiven, max: 100 },
                    { label: 'Requests Posted', value: stats.requestsPosted, max: 20 },
                    { label: 'Success Rate', value: 89, max: 100, suffix: '%' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="text-white font-medium">
                          {item.value}{item.suffix || ''}
                        </span>
                      </div>
                      <Progress 
                        value={(item.value / item.max) * 100} 
                        className="h-2 bg-black/20"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    Top Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: 'Fashion', responses: 28, color: 'from-pink-500 to-purple-500' },
                    { category: 'Skincare', responses: 12, color: 'from-yellow-500 to-orange-500' },
                    { category: 'Fitness', responses: 5, color: 'from-green-500 to-blue-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                        <span className="text-gray-300">{item.category}</span>
                      </div>
                      <Badge variant="outline" className="border-gray-400 text-gray-400">
                        {item.responses} responses
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-400/50' 
                      : 'bg-black/20 border-white/10 opacity-60'
                  }`}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">
                        {achievement.description}
                      </p>
                      <Badge 
                        variant={achievement.unlocked ? "default" : "outline"}
                        className={achievement.unlocked 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                          : "border-gray-400 text-gray-400"
                        }
                      >
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-black/10 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'response' ? 'bg-blue-500/20 text-blue-400' :
                        activity.type === 'upvote' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'request' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {activity.type === 'response' && <MessageCircle className="w-4 h-4" />}
                        {activity.type === 'upvote' && <TrendingUp className="w-4 h-4" />}
                        {activity.type === 'request' && <Target className="w-4 h-4" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-white text-sm">{activity.content}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      +{activity.points} pts
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}