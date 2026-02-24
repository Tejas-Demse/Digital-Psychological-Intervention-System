import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Building, Phone, Save, ArrowLeft } from 'lucide-react';
import api from '../api/axios';

export function ProfileSettings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    department: '',
    contact_number: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile/');
        setFormData({
          username: res.data.username || '',
          email: res.data.email || '',
          department: res.data.department || '',
          contact_number: res.data.contact_number || '',
        });
      } catch (err) {
        setErrorMsg('Failed to load profile parameters.');
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await api.put('/users/profile/', formData);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      setErrorMsg('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1E293B]">Profile Settings</h1>
            <p className="text-[#64748B] mt-2">Manage your account details and preferences.</p>
          </div>
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-[#4F46E5] hover:text-[#4338CA] font-medium bg-[#EEF2FF] px-4 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#E2E8F0]">
              <div className="w-24 h-24 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B]">{formData.username}</h2>
                <p className="text-[#64748B] capitalize">{user?.role} Account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Username</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      disabled
                      value={formData.username}
                      className="w-full pl-12 pr-4 py-3 bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-[#64748B] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Department</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                      placeholder="e.g. Psychology Dept"
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="tel"
                      value={formData.contact_number}
                      onChange={e => setFormData({...formData, contact_number: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {successMsg && <div className="p-4 bg-[#ECFDF5] text-[#059669] rounded-xl border border-[#A7F3D0]">{successMsg}</div>}
              {errorMsg && <div className="p-4 bg-[#FEE2E2] text-[#DC2626] rounded-xl border border-[#FECACA]">{errorMsg}</div>}

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
