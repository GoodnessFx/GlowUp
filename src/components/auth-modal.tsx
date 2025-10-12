import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Sparkles, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../App';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '', username: '' });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(signInForm.email, signInForm.password);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(signUpForm.email, signUpForm.password, signUpForm.username);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (_provider: 'twitter' | 'pinterest') => {
    toast.info('Social sign-in is disabled in demo mode.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-2xl font-bold text-black"
            >
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span>Welcome to GlowUp</span>
            </motion.div>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Join the community and start your glow-up journey today
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20">
            <TabsTrigger value="signin" className="data-[state=active]:bg-gray-800 text-white">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-gray-800 text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </motion.form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-gray-200">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="Choose a username"
                    value={signUpForm.username}
                    onChange={(e) => setSignUpForm({ ...signUpForm, username: e.target.value })}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Create Account'
                )}
              </Button>
            </motion.form>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialAuth('pinterest')}
              disabled={loading}
              className="bg-black text-white border-gray-700 hover:bg-gray-700 hover:border-gray-500"
            >
              Pinterest
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialAuth('twitter')}
              disabled={loading}
              className="bg-black text-white border-gray-700 hover:bg-gray-700 hover:border-gray-500"
            >
              X
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          By joining GlowUp, you agree to help others glow up and earn rewards doing it! ✨
        </div>
      </DialogContent>
    </Dialog>
  );
}
