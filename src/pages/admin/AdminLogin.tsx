import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Shield } from 'lucide-react';
import { UserRole } from '@/types/auth';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);

      if (user && (user.role === UserRole.ADMIN || user.role === UserRole.STAFF)) {
        toast.success('Login successful! Welcome back.');
        navigate('/console/dashboard', { replace: true });
      } else if (user) {
        toast.error('Access denied. Admin or staff credentials required.');
      } else {
        toast.error('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      toast.error('Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md px-6">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Access JewelCart Management Portal
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@jewelcart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In to Admin Panel'
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                Authorized personnel only. All access is monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}