
import React, { useState } from 'react';
import { useAuth } from '@/context/MockAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthPage = () => {
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === '/signup';
  const [username, setUsername] = useState('');

  React.useEffect(() => {
    if (user) navigate('/admin');
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim().toLowerCase());
    navigate('/admin');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    signup(username.trim().toLowerCase());
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 md:pt-0 md:justify-center bg-background p-4">
      <div className="mb-8 text-center flex flex-col items-center">
        <img src="https://myhockeybio.com/wp-content/uploads/2025/03/MHB-Logo-white.png" alt="MyHockeyBio" className="h-8 mb-2" />
        <p className="text-sm text-muted-foreground mt-1">Your hockey link-in-bio</p>
      </div>

      <Card className="w-full max-w-sm shadow-lg border-border">
        <CardContent className="pt-6">
          <Tabs defaultValue={isSignup ? 'signup' : 'login'}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoFocus
                />
                <Button type="submit" className="w-full">Log In</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Input
                    placeholder="Choose a username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">This will be your profile URL: myhockeybio.com/<strong>{username || '...'}</strong></p>
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
