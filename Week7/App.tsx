
import React, { useState, useEffect } from 'react';
import { Mail, Lock, UserPlus, CheckCircle, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { RegistrationData, ValidationErrors, RegistrationStatus } from './types';
import { registerUser } from './services/authService';
import { ValidationMessage } from './components/ValidationMessage';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<RegistrationStatus>(RegistrationStatus.IDLE);
  const [serverMessage, setServerMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  // Regex patterns as requested in assignment
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Rule: At least 6 chars, 1 number, 1 special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 1. Username (Email format)
    if (!formData.username) {
      newErrors.username = 'Email is required';
    } else if (!emailRegex.test(formData.username)) {
      newErrors.username = 'Invalid email format';
    }

    // 2. Password (At least 6 chars, 1 number, 1 special char)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Must be at least 6 characters';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Must contain at least 1 number and 1 special character';
    }

    // 3. Confirm Password (Must be same as password)
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setStatus(RegistrationStatus.LOADING);
    setServerMessage('');

    try {
      const result = await registerUser(formData);
      if (result.success) {
        setStatus(RegistrationStatus.SUCCESS);
        setServerMessage(result.message);
        // Clear form on success
        setFormData({ username: '', password: '', confirmPassword: '' });
      }
    } catch (err: any) {
      setStatus(RegistrationStatus.ERROR);
      setServerMessage(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join our secure community today</p>
        </div>

        {/* Success Message Card */}
        {status === RegistrationStatus.SUCCESS && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-emerald-800 font-semibold">{serverMessage}</p>
              <p className="text-emerald-600 text-sm">You can now proceed to login.</p>
              <button 
                onClick={() => setStatus(RegistrationStatus.IDLE)}
                className="mt-2 text-xs font-bold text-emerald-700 uppercase tracking-wider hover:underline"
              >
                Create another account
              </button>
            </div>
          </div>
        )}

        {/* Error Message Card */}
        {status === RegistrationStatus.ERROR && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-rose-800 font-semibold">Registration Failed</p>
              <p className="text-rose-600 text-sm">{serverMessage}</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="username">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors.username ? 'border-rose-300 ring-rose-50' : 'border-slate-200 ring-blue-50'
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              <ValidationMessage message={errors.username} />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors.password ? 'border-rose-300 ring-rose-50' : 'border-slate-200 ring-blue-50'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ValidationMessage message={errors.password} />
              <p className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                Min 6 chars • 1 number • 1 special character
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="confirmPassword">
                Re-confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors.confirmPassword ? 'border-rose-300 ring-rose-50' : 'border-slate-200 ring-blue-50'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              <ValidationMessage message={errors.confirmPassword} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === RegistrationStatus.LOADING}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {status === RegistrationStatus.LOADING ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Creating Account...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </form>

          {/* Footer Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <a href="#" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Assignment Specific Notice (Matching the logic requested) */}
        <div className="mt-8 p-4 bg-white/50 border border-slate-200 rounded-lg text-[11px] text-slate-400 leading-relaxed shadow-sm">
          <p className="font-bold uppercase tracking-wider mb-1 text-slate-500">Assignment Note:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Validation logic uses Regex for email format check.</li>
            <li>Password rule: 6+ characters, 1 number, 1 special character via Regex.</li>
            <li>Mock backend integration simulates MongoDB user creation validation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
