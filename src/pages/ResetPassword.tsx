import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const type = (searchParams.get('type') ?? 'customer') as 'customer' | 'staff';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm text-center">
          <p className="text-gray-500 mb-4">Invalid or missing reset link.</p>
          <Link to="/forgot-password" className="text-brandgold font-medium hover:underline text-sm">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await apiService.resetPassword(token, password, type);
      toast({ title: 'Password reset successfully', description: 'You can now sign in with your new password.' });
      navigate(type === 'staff' ? '/console/login' : '/login');
    } catch (err: any) {
      setError(err.message ?? 'Invalid or expired reset link. Please request a new one.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-white">
      <div className="w-full max-w-sm">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brandgold transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign in
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-brandblue">New password</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Choose a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-gray-500">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-11 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold transition-colors"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
