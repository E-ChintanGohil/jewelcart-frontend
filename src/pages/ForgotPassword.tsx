import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.forgotPassword(email, 'customer');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
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
          <h1 className="text-2xl font-semibold text-brandblue">Reset password</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                If that email is registered, a reset link has been sent. Check your inbox.
              </AlertDescription>
            </Alert>
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-brandgold font-medium hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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

            <Button
              type="submit"
              className="w-full h-11 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
