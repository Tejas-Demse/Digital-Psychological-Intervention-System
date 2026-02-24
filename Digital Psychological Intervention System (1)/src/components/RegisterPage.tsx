import { useState } from 'react';
import { Heart, Lock, Mail, User as UserIcon, Building } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    department: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/users/register/', formData);
      navigate('/'); // Redirect to login on success
    } catch (err: any) {
      setError(
        err.response?.data?.username?.[0] || 
        err.response?.data?.email?.[0] || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#F0FDFA]"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-2xl mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
            Join MindCare
          </h1>
          <p className="text-[#64748B] text-base">Create your secure account</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#1E293B] font-medium mb-1">Username / ID</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:bg-white focus:border-[#4F46E5] outline-none transition-all"
                  placeholder="Student ID or Username"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1E293B] font-medium mb-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:bg-white focus:border-[#4F46E5] outline-none transition-all"
                  placeholder="university@email.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1E293B] font-medium mb-1">Department (Optional)</label>
              <div className="relative group">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:bg-white focus:border-[#4F46E5] outline-none transition-all"
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1E293B] font-medium mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:bg-white focus:border-[#4F46E5] outline-none transition-all"
              >
                <option value="student">Student / Patient</option>
                <option value="counselor">Counselor / Therapist</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1E293B] font-medium mb-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:bg-white focus:border-[#4F46E5] outline-none transition-all"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl p-3 text-[#991B1B] text-center text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white py-3.5 rounded-xl font-semibold hover:from-[#4338CA] hover:to-[#7C3AED] transition-all shadow-lg active:translate-y-0 disabled:opacity-70"
            >
              {isSubmitting ? 'Creating Account...' : 'Register Context'}
            </button>

            <div className="mt-4 text-center">
              <p className="text-[#64748B] text-sm">
                Already have an account?{' '}
                <Link to="/" className="text-[#4F46E5] font-semibold hover:text-[#4338CA] transition-colors">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
