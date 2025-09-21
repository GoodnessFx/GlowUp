import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { LandingHero } from './components/landing-hero';
import { AuthModal } from './components/auth-modal';
import { GlowUpFeed } from './components/glowup-feed';
import { UserProfile } from './components/user-profile';
import { Leaderboard } from './components/leaderboard';
import { PostRequest } from './components/post-request';
import { HealthCheck } from './components/health-check';
import { supabase } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
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
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentView('feed');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentView('feed');
      } else {
        setCurrentView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw new Error(error.message);
      }
      
      if (data.user) {
        setShowAuthModal(false);
        toast('Welcome back to GlowUp! ✨');
      }
    } catch (error: any) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Call our server endpoint for signup
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40db5d3a/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, username })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Signup error response:', errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log('Signup successful:', result);

      // Now sign in the user
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        console.error('Auto sign in after signup failed:', error);
        throw new Error(`Account created but sign in failed: ${error.message}`);
      }

      setShowAuthModal(false);
      toast('Welcome to GlowUp! Your glow-up journey starts now! 🌟');
    } catch (error: any) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setCurrentView('landing');
    toast('See you later! Keep glowing ✨');
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
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
                  className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
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
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
            
            {currentView === 'feed' && user && (
              <motion.div
                key="feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlowUpFeed />
              </motion.div>
            )}
            
            {currentView === 'profile' && user && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserProfile user={user} />
              </motion.div>
            )}
            
            {currentView === 'leaderboard' && user && (
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

        {/* Auth Modal */}
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