import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, TestTube } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function DevCredentials() {
  const testCredentials = {
    email: 'test@glowup.com',
    password: 'testpass123',
    username: 'testuser'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard!`);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="bg-black/80 border-white/10 backdrop-blur-lg w-72">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <TestTube className="w-4 h-4 text-green-400" />
            Test Credentials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs text-gray-300">
            Use these credentials to test login:
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Email:</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white font-mono">{testCredentials.email}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(testCredentials.email, 'Email')}
                  className="h-4 w-4 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Password:</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white font-mono">{testCredentials.password}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(testCredentials.password, 'Password')}
                  className="h-4 w-4 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-amber-400 mt-2">
            💡 Create this account using the health check if it doesn't exist
          </div>
        </CardContent>
      </Card>
    </div>
  );
}