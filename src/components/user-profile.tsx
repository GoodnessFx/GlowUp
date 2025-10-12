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

export function UserProfile({ user }) {
  const [activeTab, setActiveTab] = useState('overview');
  const referralCode = user?.referralCode || 'GLOWUP';
  const referralLink = `${window.location.origin}?ref=${referralCode}`;
  const [referrals, setReferrals] = useState(() => {
    const stored = localStorage.getItem('glowup:referrals');
    return stored
      ? JSON.parse(stored)
      : [
          { email: 'friend1@example.com', joinedAt: '2025-09-15', reward: 5 },
          { email: 'friend2@example.com', joinedAt: '2025-09-28', reward: 5 }
        ];
  });
  const totalReferralEarnings = referrals.reduce((sum, r) => sum + r.reward, 0);
  const [walletBalance, setWalletBalance] = useState(() => {
    const v = localStorage.getItem('glowup:wallet');
    return v ? parseFloat(v) : 0;
  });

  const stats = {
    totalPoints: 1250,
    level: 8,
    nextLevelPoints: 1500,
    totalEarnings: 87.5,
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

  const achievements = [
    { id: 1, name: 'First GlowUp', description: 'Posted your first request', icon: '✨', unlocked: true },
    { id: 2, name: 'Helper', description: 'Helped 5 people glow up', icon: '🤝', unlocked: true },
    { id: 3, name: 'Style Guru', description: 'Got 50 upvotes on responses', icon: '👑', unlocked: true },
    { id: 4, name: 'Trendsetter', description: 'Posted a viral request', icon: '🔥', unlocked: false },
    { id: 5, name: 'Community Champion', description: 'Helped 100 people', icon: '🏆', unlocked: false },
    { id: 6, name: 'Glow Master', description: 'Reached max level', icon: '🌟', unlocked: false }
  ];

  const recentActivity = [
    { id: 1, type: 'response', content: 'Recommended Adidas Stan Smiths for daily wear', points: 15, time: '2 hours ago' },
    { id: 2, type: 'upvote', content: 'Your skincare routine recommendation got upvoted', points: 5, time: '4 hours ago' },
    { id: 3, type: 'request', content: 'Posted "Need winter coat under $200"', points: 10, time: '1 day ago' },
    { id: 4, type: 'achievement', content: 'Unlocked "Style Guru" achievement', points: 50, time: '2 days ago' }
  ];

  const simulatePayout = () => {
    const newBalance = walletBalance + totalReferralEarnings;
    setWalletBalance(newBalance);
    localStorage.setItem('glowup:wallet', newBalance.toString());
  };

  const progressToNextLevel = ((stats.totalPoints - (stats.level - 1) * 150) / 150) * 100;
  const currentLevelTitle = levelTitles[stats.level] || 'Master';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#F8F9FA] min-h-screen text-[#111827]">
      {/* Profile Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <Card className="bg-white shadow-md border border-gray-100">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-[#9333EA]">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] text-2xl text-white">
                    {user?.user_metadata?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2"
                >
                  <Trophy className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <h1 className="text-3xl font-bold">{user?.user_metadata?.username || user?.email?.split('@')[0]}</h1>
                  <Badge className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] text-white">
                    <Star className="w-3 h-3 mr-1" /> Level {stats.level} {currentLevelTitle}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">Helping others glow up since joining GlowUp</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress to Level {stats.level + 1}</span>
                    <span className="text-[#9333EA] font-medium">
                      {stats.totalPoints} / {stats.nextLevelPoints} points
                    </span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2 bg-gray-200" />
                </div>
              </div>

              <Button className="bg-[#111827] text-white hover:bg-[#1F2937]">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[{ label: 'Total Points', value: stats.totalPoints.toLocaleString(), icon: <Zap className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500' },
          { label: 'People Helped', value: stats.helpedPeople, icon: <Heart className="w-5 h-5" />, color: 'from-pink-500 to-purple-500' },
          { label: 'Earnings', value: `$${stats.totalEarnings}`, icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
          { label: 'Upvotes', value: stats.upvotesReceived, icon: <Award className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' }].map((stat, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mb-3 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Referral Program */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <Card className="bg-white shadow border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#111827]">
              <Wallet className="w-5 h-5 text-[#9333EA]" /> Earn by Referring Friends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Your referral link</div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 border border-gray-200">
                  <LinkIcon className="w-4 h-4 text-[#9333EA]" />
                  <span className="truncate text-[#111827]">{referralLink}</span>
                </div>
              </div>
              <Button onClick={() => navigator.clipboard.writeText(referralLink)} className="bg-[#111827] text-white hover:bg-[#1F2937]">
                Copy Link
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: 'Referrals', value: referrals.length },
                { label: 'Earnings', value: `$${totalReferralEarnings.toFixed(2)}` },
                { label: 'Wallet', value: `$${walletBalance.toFixed(2)}` }].map((item, index) => (
                <Card key={index} className="bg-gray-50 border border-gray-200 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-[#111827] mb-1">{item.value}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-sm text-gray-500">You earn $5 for each friend who joins. Payouts are simulated in demo mode.</div>
            <Button onClick={simulatePayout} className="bg-[#111827] text-white hover:bg-[#1F2937]">
              Transfer Earnings to Wallet
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
