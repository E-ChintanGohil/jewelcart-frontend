import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        switch (user.role) {
          case 'admin':
          case 'staff':
            navigate('/console/dashboard');
            break;
          case 'customer':
          default:
            navigate(from);
            break;
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Left — Image panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="/assets/images/spotlight1.jpg"
          alt="JewelCart Store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brandblue/70" />
        <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3">Welcome back</p>
          <h2 className="text-3xl font-light leading-snug max-w-sm">
            Where every piece tells&nbsp;a&nbsp;story
          </h2>
          <div className="mt-8 flex items-center gap-6 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Secure checkout
            </span>
            <span>Certified jewellery</span>
            <span>Free returns</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-brandblue">Sign in</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Enter your credentials to continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-brandgold hover:text-brandgold/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-brandgold font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
