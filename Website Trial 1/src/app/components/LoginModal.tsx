import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  if (!isOpen) return null;

  // Password validation function
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('At least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('At least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('At least one special character');
    }
    
    return errors;
  };

  // Check if passwords match
  const checkPasswordsMatch = (pass: string, confirmPass: string): boolean => {
    return pass === confirmPass;
  };

  // Handle password change with validation
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    if (isCreatingAccount) {
      setPasswordErrors(validatePassword(newPassword));
      setPasswordsMatch(checkPasswordsMatch(newPassword, confirmPassword));
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(checkPasswordsMatch(password, newConfirmPassword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCreatingAccount) {
      const errors = validatePassword(password);
      const match = checkPasswordsMatch(password, confirmPassword);
      
      if (errors.length > 0 || !match) {
        setPasswordErrors(errors);
        setPasswordsMatch(match);
        return;
      }
    }
    
    if (onLogin) {
      onLogin(email, password);
    }
    // Clear form and close modal
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordErrors([]);
    setPasswordsMatch(true);
    onClose();
  };

  const toggleAccountMode = () => {
    setIsCreatingAccount(!isCreatingAccount);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordErrors([]);
    setPasswordsMatch(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[600px] relative rounded-lg shadow-2xl border-2 border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-wider text-gray-800">
              MY CERCLE
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-light text-gray-700 mb-2">
              {isCreatingAccount ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-600">
              {isCreatingAccount 
                ? 'Join to start shopping pre-loved fashion'
                : 'Sign in to continue to your account'
              }
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border ${passwordErrors.length > 0 && isCreatingAccount ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only show when creating account */}
            {isCreatingAccount && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  RE-ENTER PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 border ${!passwordsMatch && confirmPassword ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Password Validation Errors - Only show when creating account */}
            {isCreatingAccount && passwordErrors.length > 0 && (
              <div className="text-sm text-red-600 space-y-1">
                <p className="font-medium">Password must have:</p>
                <ul className="list-disc list-inside space-y-1">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Passwords Don't Match Error */}
            {isCreatingAccount && !passwordsMatch && confirmPassword && (
              <div className="text-sm text-red-600">
                <p>Passwords do not match</p>
              </div>
            )}

            {/* Forgot Password Link */}
            {!isCreatingAccount && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 px-6 hover:bg-gray-900 transition-colors font-medium text-sm tracking-wider"
            >
              {isCreatingAccount ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Create Account / Sign In Toggle */}
            <button
              type="button"
              onClick={toggleAccountMode}
              className="w-full border border-gray-800 text-gray-800 py-3 px-6 hover:bg-gray-50 transition-colors font-medium text-sm tracking-wider"
            >
              {isCreatingAccount ? 'SIGN IN INSTEAD' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <button className="underline hover:text-gray-700">Terms of Service</button>
              {' '}and{' '}
              <button className="underline hover:text-gray-700">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}