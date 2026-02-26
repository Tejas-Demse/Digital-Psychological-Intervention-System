import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  LogOut,
  Heart,
  Menu,
  X,
  BookMarked,
  AlertCircle,
  ClipboardCheck,
  Sparkles,
  Phone,
  Activity
} from 'lucide-react';
import { BookingSystem } from './BookingSystem';
import { ResourceHub } from './ResourceHub';
import { PeerSupport } from './PeerSupport';
import { ExamToolkit } from './ExamToolkit';
import { CrisisSafety } from './CrisisSafety';
import { SelfAssessment } from './SelfAssessment';
import { AssessmentHistory } from './AssessmentHistory';
import type { User } from '../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'booking' | 'resources' | 'peer' | 'exam' | 'crisis' | 'assessment' | 'history';

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('assessment');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'assessment' as Tab, label: 'Take Test', icon: ClipboardCheck },
    { id: 'history' as Tab, label: 'My Progress', icon: Activity },
    { id: 'booking' as Tab, label: 'Book Appointment', icon: Calendar },
    { id: 'resources' as Tab, label: 'Resources', icon: BookOpen },
    { id: 'peer' as Tab, label: 'Peer Support', icon: Users },
    { id: 'exam' as Tab, label: 'Exam Toolkit', icon: BookMarked },
    { id: 'crisis' as Tab, label: 'Crisis & Safety', icon: AlertCircle }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-[#1E293B] text-xl font-bold">MindCare Portal</h1>
                <p className="text-[#64748B] text-sm flex items-center gap-2">
                  Welcome, <span className="text-[#4F46E5] font-semibold">{user.name}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-[#F1F5F9] rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#64748B]" /> : <Menu className="w-6 h-6 text-[#64748B]" />}
              </button>
              <Link
                to="/profile"
                className="hidden lg:flex items-center gap-2 px-4 py-2 border-2 border-[#E2E8F0] hover:border-[#4F46E5] text-[#1E293B] bg-white hover:bg-[#EEF2FF] rounded-xl transition-all font-semibold shadow-sm"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                My Profile
              </Link>
              <button
                onClick={onLogout}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Sidebar Navigation */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block bg-white border-r border-[#E2E8F0] lg:w-72 p-5 shadow-sm lg:shadow-none`}>
          <div className="space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium relative group ${isActive
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white shadow-lg shadow-[#4F46E5]/25'
                    : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9]'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive
                    ? 'bg-white/20'
                    : 'bg-[#F1F5F9] group-hover:bg-[#E2E8F0]'
                    } transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[15px]">{tab.label}</span>
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="lg:hidden w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-all font-medium"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F1F5F9]">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="text-[15px]">Logout</span>
            </button>
          </div>

          {/* Crisis Banner */}
          <div className="mt-6 bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] border border-[#FCA5A5] rounded-xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#991B1B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#991B1B]" />
              </div>
              <div>
                <p className="text-[#991B1B] font-bold text-sm mb-0.5">Crisis Hotline</p>
                <p className="text-[#B91C1C] font-bold text-lg tracking-wide">1-800-HELP-NOW</p>
                <p className="text-[#DC2626] text-xs mt-1 font-medium">Available 24/7</p>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-4 px-4">
            <p className="text-[#94A3B8] text-xs text-center">
              🔒 All sessions are confidential
            </p>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'booking' && <BookingSystem />}
            {activeTab === 'resources' && <ResourceHub />}
            {activeTab === 'peer' && <PeerSupport />}
            {activeTab === 'exam' && <ExamToolkit />}
            {activeTab === 'crisis' && <CrisisSafety />}
            {activeTab === 'assessment' && <SelfAssessment onNavigate={(tab) => setActiveTab(tab as Tab)} />}
            {activeTab === 'history' && <AssessmentHistory />}
          </div>
        </main>
      </div>
    </div>
  );
}
