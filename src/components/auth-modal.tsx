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
// Supabase OAuth removed for dummy auth mode

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
    // In dummy mode, just show a toast
    toast.info('Social sign-in is disabled in demo mode.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-purple-900 border-purple-400/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-2xl font-bold"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to GlowUp
              </span>
            </motion.div>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Join the community and start your glow-up journey today
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20">
            <TabsTrigger value="signin" className="data-[state=active]:bg-purple-500/20">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-purple-500/20">
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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

        {/* Social Authentication */}
        <div className="space-y-4 mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-br from-gray-900 to-purple-900 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialAuth('pinterest')}
              disabled={loading}
              className="bg-black/20 border-white/10 text-white hover:bg-red-500/20 hover:border-red-400/30"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c.343 0 .682-.015 1.016-.043-.44-1.793-.44-4.086-.44-4.086-.44-.878-.44-1.757-.44-2.636V14.91c-.088-.878-.088-1.757-.088-2.636v-1.32c0-.878 0-1.757.088-2.636C12.88 6.56 13.759 5.68 14.64 4.8c.878-.88 1.756-1.758 2.635-2.636C16.396 1.283 15.517.404 14.638-.44c-.878-.845-1.757-1.725-2.636-2.604C11.123-.956 10.244-.077 9.364.803c-.88.88-1.758 1.759-2.636 2.638C5.85 4.32 4.97 5.2 4.09 6.08c-.88.88-1.758 1.759-2.636 2.638C.573 9.597-.306 10.476-.306 11.355v1.32c0 .878 0 1.757.088 2.636v1.32c0 .878 0 1.757.088 2.636.088.878.088 1.757.176 2.636v1.32c.088.878.176 1.757.264 2.636C1.189 21.736 2.949 23.054 5.108 23.78c.878.293 1.757.586 2.636.88C9.502 24.953 11.26 25 12 25c6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
              </svg>
              Pinterest
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialAuth('twitter')}
              disabled={loading}
              className="bg-black/20 border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-400/30"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
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