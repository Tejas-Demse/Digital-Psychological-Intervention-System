import { useState } from 'react';
import { Heart, Lock, Mail, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/users/login/', {
        username: email, // Using email as username per Django default config or custom logic
        password: password
      });

      const { access, role, username, id } = response.data;
      
      login(access, {
        id: id,
        name: username,
        email: email,
        role: role
      });

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#F0FDFA]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#4F46E5]/10 to-[#8B5CF6]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#14B8A6]/10 to-[#8B5CF6]/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-2xl mb-6 shadow-lg hover-lift">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
            MindCare Portal
          </h1>
          <p className="text-[#64748B] text-base">
            Digital Psychological Intervention System
          </p>
        </div>

        {/* Demo Credentials Info */}
        {showDemo && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#E0E7FF] rounded-xl p-5 mb-6 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F46E5]/10 to-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1E293B] font-semibold mb-3 flex items-center gap-2">
                  Demo Login Credentials
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-[#E2E8F0] hover:border-[#4F46E5] transition-colors">
                    <p className="text-[#4F46E5] font-semibold mb-1 text-sm">Student Portal</p>
                    <p className="text-[#64748B] text-sm font-mono">student@demo.com</p>
                    <p className="text-[#64748B] text-sm font-mono">student123</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#E2E8F0] hover:border-[#4F46E5] transition-colors">
                    <p className="text-[#4F46E5] font-semibold mb-1 text-sm">Admin Dashboard</p>
                    <p className="text-[#64748B] text-sm font-mono">admin@demo.com</p>
                    <p className="text-[#64748B] text-sm font-mono">admin123</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="text-[#94A3B8] hover:text-[#64748B] transition-colors flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9]"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#1E293B] font-medium mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[#1E293B] font-medium mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl p-4 text-[#991B1B] text-center text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white py-3.5 rounded-xl font-semibold hover:from-[#4338CA] hover:to-[#7C3AED] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In Securely
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-[#64748B] text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-[#4F46E5] hover:text-[#4338CA] font-semibold transition-colors"
              >
                Create one now
              </Link>
            </p>
            <p className="text-[#64748B] text-sm">
              Need help?{' '}
              <a href="#" className="text-[#4F46E5] hover:text-[#4338CA] font-medium transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Crisis Hotline */}
        <div className="mt-6 text-center bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border border-[#FCA5A5] rounded-xl p-5 shadow-md">
          <p className="text-[#991B1B] font-semibold mb-1 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Crisis Support Available 24/7
          </p>
          <p className="text-[#B91C1C] text-lg font-bold tracking-wide">1-800-HELP-NOW</p>
        </div>

        {/* Privacy Notice */}
        <p className="text-center text-[#94A3B8] text-xs mt-6">
          🔒 Your privacy matters. All sessions are confidential and encrypted.
        </p>
      </div>
    </div>
  );
}
