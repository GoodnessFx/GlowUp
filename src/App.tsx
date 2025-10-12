import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, TrendingUp, Users, Award, Search, Filter, Plus, User, LogOut, Home, UserPlus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Separator } from './components/ui/separator';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { LandingHero } from './components/landing-hero';
import { AuthModal } from './components/auth-modal';
import { GlowUpFeed } from './components/glowup-feed';
import { UserProfile } from './components/user-profile';
import { Leaderboard } from './components/leaderboard';
import { PostRequest } from './components/post-request';
import { HealthCheck } from './components/health-check';
// Supabase auth removed. We now use a lightweight local dummy auth stored in localStorage.
import { isDevelopment } from './utils/env';

// Auth Context
interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'feed' | 'profile' | 'leaderboard'>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    // Dummy auth bootstrap: load from localStorage or create guest
    const stored = localStorage.getItem('glowup:user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {}
    } else {
      const guest = {
        id: 'guest',
        email: 'guest@glowup.app',
        user_metadata: { username: 'guest' },
        referralCode: Math.random().toString(36).slice(2, 8).toUpperCase()
      };
      localStorage.setItem('glowup:user', JSON.stringify(guest));
      setUser(guest);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Dummy sign-in just stores a user shell
    const dummy = {
      id: 'user-' + Date.now(),
      email,
      user_metadata: { username: email.split('@')[0] },
      referralCode: Math.random().toString(36).slice(2, 8).toUpperCase()
    };
    localStorage.setItem('glowup:user', JSON.stringify(dummy));
    setUser(dummy);
    setShowAuthModal(false);
    setCurrentView('feed');
    toast('Welcome back to GlowUp! ✨');
  };

  const signUp = async (email: string, password: string, username: string) => {
    // Dummy sign-up creates local user
    const dummy = {
      id: 'user-' + Date.now(),
      email,
      user_metadata: { username },
      referralCode: Math.random().toString(36).slice(2, 8).toUpperCase()
    };
    localStorage.setItem('glowup:user', JSON.stringify(dummy));
    setUser(dummy);
    setShowAuthModal(false);
    setCurrentView('feed');
    toast('Welcome to GlowUp! Your glow-up journey starts now! 🌟');
  };

  const signOut = async () => {
    localStorage.removeItem('glowup:user');
    const guest = {
      id: 'guest',
      email: 'guest@glowup.app',
      user_metadata: { username: 'guest' },
      referralCode: Math.random().toString(36).slice(2, 8).toUpperCase()
    };
    localStorage.setItem('glowup:user', JSON.stringify(guest));
    setUser(guest);
    setCurrentView('landing');
    toast('Signed out. Browsing as guest ✨');
  };

  const authContextValue = {
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="relative min-h-screen bg-gradient-to-br from-[#0f1115] via-[#121418] to-[#0f1115] overflow-hidden">
        {/* Pinterest-like soft imagery background with subtle blur and vignette */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-30"
          />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>
        {/* Navigation */}
        {user && (
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                 className="text-2xl font-bold text-black cursor-pointer"

                  onClick={() => setCurrentView('feed')}
                >
                  GlowUp
                </motion.div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('feed')}
                    className={currentView === 'feed' ? 'bg-purple-500/20' : ''}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Feed
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('leaderboard')}
                    className={currentView === 'leaderboard' ? 'bg-purple-500/20' : ''}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('profile')}
                    className={currentView === 'profile' ? 'bg-purple-500/20' : ''}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                 <Button
  onClick={() => setShowPostModal(true)}
  className="!bg-black !text-white hover:!bg-gray-800"
>
  <Plus className="w-4 h-4 mr-2" />
  Post Request
</Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}

        {/* Main Content */}
        <main className={user ? 'pt-16' : ''}>
          <AnimatePresence mode="wait">
            {currentView === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LandingHero onAuthClick={() => setShowAuthModal(true)} />
              </motion.div>
            )}
            
            {currentView === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlowUpFeed />
              </motion.div>
            )}
            
            {currentView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserProfile user={user} />
              </motion.div>
            )}
            
            {currentView === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Leaderboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Auth Modal remains available to claim a username, but app is fully accessible without login */}
        <AuthModal 
          open={showAuthModal} 
          onOpenChange={setShowAuthModal}
        />

        {/* Post Request Modal */}
        <PostRequest 
          open={showPostModal} 
          onOpenChange={setShowPostModal}
        />

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              color: 'white',
            },
          }}
        />

        {/* Health Check (for debugging) */}
        {isDevelopment() && <HealthCheck />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;