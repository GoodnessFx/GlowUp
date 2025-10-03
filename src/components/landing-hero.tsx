import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, Star, Users, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface LandingHeroProps {
  onAuthClick: () => void;
}

const inspirationalQuotes = [
  "Your glow up starts with one small step ✨",
  "Style is a way to say who you are without having to speak 💫",
  "Confidence is the best outfit you can wear 🌟",
  "Invest in yourself, you're worth it 💎",
  "Every day is a chance to glow up 🌅",
  "Your style journey begins here 🚀",
  "Beauty begins the moment you decide to be yourself 💕",
  "Glow up together, rise together 🌈"
];

const features = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Get Personalized Advice",
    description: "Post what you need and get curated recommendations from real people"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Earn Rewards",
    description: "Help others glow up and earn points, badges, and real money"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Join the Community",
    description: "Connect with fashion, fitness, and skincare enthusiasts"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Level Up",
    description: "Climb the leaderboard and unlock exclusive helper status"
  }
];

export function LandingHero({ onAuthClick }: LandingHeroProps) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  GlowUp
                </span>
              </h1>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 text-yellow-400"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Cycling Quotes */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12 h-16 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl text-gray-300 max-w-2xl"
              >
                {inspirationalQuotes[currentQuote]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={onAuthClick}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Glow Up
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onAuthClick}
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg rounded-full"
            >
              Join the Community
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20"
          >
            {[
              { number: "10K+", label: "Glow Ups" },
              { number: "5K+", label: "Helpers" },
              { number: "$50K+", label: "Earned" },
              { number: "98%", label: "Happy Users" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Style Journey Awaits
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From fashion to fitness to skincare - we've got your glow-up covered
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Fashion & Style",
                image: "https://images.unsplash.com/photo-1708363390932-15e8a29c0f56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGUlMjB3b21hbnxlbnwxfHx8fDE3NTg0MTYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Get personalized outfit recommendations and style advice",
                color: "from-pink-500 to-purple-500"
              },
              {
                title: "Skincare & Beauty",
                image: "https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHJvdXRpbmV8ZW58MXx8fHwxNzU4NDE2MjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Discover products for your skin type and beauty goals",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Fitness & Wellness",
                image: "https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd29ya291dHxlbnwxfHx8fDE3NTg0MDEwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "Find gear and advice to reach your fitness goals",
                color: "from-green-500 to-blue-500"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-400/50 transition-all duration-500 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-300">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                How GlowUp Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A community-driven marketplace where style meets rewards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Glow Up?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands who are already transforming their style and earning rewards
          </p>
          <Button
            onClick={onAuthClick}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Star className="w-6 h-6 mr-2" />
            Get Started Now
          </Button>
        </motion.div>
      </section>
    </div>
  );
}