import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Gem } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        navigate('/');
      } else {
        toast({
          title: "Registration failed",
          description: "Email already exists or invalid data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration",
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
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3">Join us</p>
          <h2 className="text-3xl font-light leading-snug max-w-sm">
            Begin your jewellery journey&nbsp;today
          </h2>
          <div className="mt-8 flex items-center gap-6 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Gem className="w-3 h-3" />
              Exclusive collections
            </span>
            <span>Member rewards</span>
            <span>Early access</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-brandblue">Create account</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Join JewelCart for an exclusive shopping experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-brandgold font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
