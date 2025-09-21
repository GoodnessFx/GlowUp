import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface HealthStatus {
  name: string;
  status: 'loading' | 'success' | 'error' | 'warning';
  message: string;
}

export function HealthCheck() {
  const [checks, setChecks] = useState<HealthStatus[]>([
    { name: 'Supabase Connection', status: 'loading', message: 'Checking...' },
    { name: 'Edge Function', status: 'loading', message: 'Checking...' },
    { name: 'Authentication', status: 'loading', message: 'Checking...' },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      runHealthChecks();
    }
  }, [isVisible]);

  const runHealthChecks = async () => {
    // Reset all checks to loading
    setChecks(prev => prev.map(check => ({ ...check, status: 'loading', message: 'Checking...' })));

    // Check Supabase connection
    try {
      const { data, error } = await supabase.auth.getSession();
      setChecks(prev => prev.map(check => 
        check.name === 'Supabase Connection' 
          ? { ...check, status: 'success', message: 'Connected successfully' }
          : check
      ));
    } catch (error: any) {
      setChecks(prev => prev.map(check => 
        check.name === 'Supabase Connection' 
          ? { ...check, status: 'error', message: `Connection failed: ${error.message}` }
          : check
      ));
    }

    // Check Edge Function
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-40db5d3a/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChecks(prev => prev.map(check => 
          check.name === 'Edge Function' 
            ? { ...check, status: 'success', message: `Server responding: ${data.status}` }
            : check
        ));
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error: any) {
      setChecks(prev => prev.map(check => 
        check.name === 'Edge Function' 
          ? { ...check, status: 'error', message: `Server unreachable: ${error.message}` }
          : check
      ));
    }

    // Check Authentication status
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setChecks(prev => prev.map(check => 
          check.name === 'Authentication' 
            ? { ...check, status: 'success', message: `Logged in as ${session.user.email}` }
            : check
        ));
      } else {
        setChecks(prev => prev.map(check => 
          check.name === 'Authentication' 
            ? { ...check, status: 'warning', message: 'Not logged in' }
            : check
        ));
      }
    } catch (error: any) {
      setChecks(prev => prev.map(check => 
        check.name === 'Authentication' 
          ? { ...check, status: 'error', message: `Auth check failed: ${error.message}` }
          : check
      ));
    }
  };

  const getStatusIcon = (status: HealthStatus['status']) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: HealthStatus['status']) => {
    switch (status) {
      case 'loading':
        return 'bg-blue-500/20 text-blue-400';
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-black/20 border-white/10 text-white hover:bg-purple-500/20"
        >
          System Status
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-black/80 border-white/10 backdrop-blur-lg w-80">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm">System Health Check</CardTitle>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {checks.map((check) => (
            <div key={check.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(check.status)}
                <span className="text-sm text-white">{check.name}</span>
              </div>
              <Badge className={getStatusColor(check.status)}>
                {check.status}
              </Badge>
            </div>
          ))}
          
          <div className="pt-2 space-y-2">
            <Button
              onClick={runHealthChecks}
              size="sm"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Refresh Checks
            </Button>
            
            <div className="text-xs text-gray-400 space-y-1">
              <div>Project: {projectId}</div>
              <div>Environment: {typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'development' : 'production'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}