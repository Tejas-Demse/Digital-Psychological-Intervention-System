import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  MessageCircle,
  LogOut,
  Heart,
  Download,
  Activity,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import type { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const MONTHLY_DATA = [
  { month: 'Jul', sessions: 45, peakHours: 12, avgDuration: 35 },
  { month: 'Aug', sessions: 52, peakHours: 14, avgDuration: 38 },
  { month: 'Sep', sessions: 68, peakHours: 16, avgDuration: 42 },
  { month: 'Oct', sessions: 78, peakHours: 18, avgDuration: 40 },
  { month: 'Nov', sessions: 95, peakHours: 22, avgDuration: 45 },
  { month: 'Dec', sessions: 112, peakHours: 24, avgDuration: 48 }
];

const CONCERN_DATA = [
  { name: 'Academic Stress', value: 35, color: '#6366F1' },
  { name: 'Anxiety', value: 28, color: '#8B5CF6' },
  { name: 'Depression', value: 15, color: '#EC4899' },
  { name: 'Social Issues', value: 12, color: '#14B8A6' },
  { name: 'Other', value: 10, color: '#F59E0B' }
];

const PEAK_HOURS_DATA = [
  { hour: '8 AM', count: 5 },
  { hour: '10 AM', count: 12 },
  { hour: '12 PM', count: 18 },
  { hour: '2 PM', count: 24 },
  { hour: '4 PM', count: 28 },
  { hour: '6 PM', count: 32 },
  { hour: '8 PM', count: 25 },
  { hour: '10 PM', count: 15 }
];

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-[#1E293B] text-xl font-bold">Admin Dashboard</h1>
                <p className="text-[#64748B] text-sm flex items-center gap-2">
                  Welcome, <span className="text-[#4F46E5] font-semibold">{user.name}</span>
                  <Activity className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-all font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Time Range Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[#1E293B] text-2xl font-bold mb-1">Analytics Overview</h2>
            <p className="text-[#64748B] text-sm">Real-time insights into platform usage and student wellbeing</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-white hover:border-[#4F46E5] focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B] font-medium"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white rounded-xl hover:from-[#4338CA] hover:to-[#7C3AED] transition-all shadow-lg hover:shadow-xl font-semibold transform hover:-translate-y-0.5">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Users */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E2E8F0] hover:border-[#4F46E5] group hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5]/10 to-[#6366F1]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-[#4F46E5]" />
              </div>
              <span className="text-[#10B981] text-sm font-bold flex items-center gap-1 bg-[#D1FAE5] px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <p className="text-[#64748B] text-sm font-medium mb-1">Active Users</p>
            <p className="text-[#1E293B] text-3xl font-bold">1,247</p>
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <p className="text-[#94A3B8] text-xs">↑ 142 from last period</p>
            </div>
          </div>

          {/* Total Sessions */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E2E8F0] hover:border-[#8B5CF6] group hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-[#8B5CF6]" />
              </div>
              <span className="text-[#10B981] text-sm font-bold flex items-center gap-1 bg-[#D1FAE5] px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                +8%
              </span>
            </div>
            <p className="text-[#64748B] text-sm font-medium mb-1">Total Sessions</p>
            <p className="text-[#1E293B] text-3xl font-bold">450</p>
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <p className="text-[#94A3B8] text-xs">↑ 34 from last period</p>
            </div>
          </div>

          {/* AI Interactions */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E2E8F0] hover:border-[#14B8A6] group hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#14B8A6]/10 to-[#2DD4BF]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-[#14B8A6]" />
              </div>
              <span className="text-[#10B981] text-sm font-bold flex items-center gap-1 bg-[#D1FAE5] px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                +15%
              </span>
            </div>
            <p className="text-[#64748B] text-sm font-medium mb-1">AI Interactions</p>
            <p className="text-[#1E293B] text-3xl font-bold">2,834</p>
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <p className="text-[#94A3B8] text-xs">↑ 369 from last period</p>
            </div>
          </div>

          {/* High Priority Cases */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E2E8F0] hover:border-[#EF4444] group hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-[#EF4444]" />
              </div>
              <span className="text-[#EF4444] text-sm font-bold flex items-center gap-1 bg-[#FEE2E2] px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                +3
              </span>
            </div>
            <p className="text-[#64748B] text-sm font-medium mb-1">High Priority Cases</p>
            <p className="text-[#1E293B] text-3xl font-bold">18</p>
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <p className="text-[#94A3B8] text-xs">Requires immediate attention</p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#1E293B] font-bold text-lg">Monthly Session Trends</h3>
                <p className="text-[#94A3B8] text-sm mt-0.5">Last 6 months overview</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#8B5CF6]" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" strokeWidth={1} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94A3B8" 
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  labelStyle={{ color: '#1E293B', fontWeight: 600, marginBottom: '4px' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  name="Total Sessions"
                  dot={{ fill: '#8B5CF6', r: 5 }}
                  activeDot={{ r: 7, fill: '#7C3AED' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDuration" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  name="Avg Duration (min)"
                  dot={{ fill: '#4F46E5', r: 5 }}
                  activeDot={{ r: 7, fill: '#4338CA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Concern Distribution */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#1E293B] font-bold text-lg">Top Concerns Distribution</h3>
                <p className="text-[#94A3B8] text-sm mt-0.5">Current period breakdown</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#14B8A6]/10 to-[#2DD4BF]/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#14B8A6]" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CONCERN_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#FFFFFF"
                >
                  {CONCERN_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#1E293B] font-bold text-lg">Peak Usage Hours</h3>
                <p className="text-[#94A3B8] text-sm mt-0.5">Daily activity patterns</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5]/10 to-[#6366F1]/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#4F46E5]" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={PEAK_HOURS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" strokeWidth={1} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#94A3B8" 
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  cursor={{ fill: '#F8FAFC' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#colorGradient)" 
                  name="Active Users"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#1E293B] font-bold text-lg">Recent High-Priority Alerts</h3>
                <p className="text-[#94A3B8] text-sm mt-0.5">Requires immediate attention</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              </div>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border border-[#FCA5A5] rounded-xl hover:shadow-md transition-all">
                <AlertTriangle className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#991B1B] font-semibold">Crisis intervention triggered</p>
                  <p className="text-[#B91C1C] text-sm mt-1">User reported self-harm thoughts - Referred to emergency services</p>
                  <p className="text-[#DC2626] text-xs mt-2 font-medium">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-xl hover:shadow-md transition-all">
                <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#92400E] font-semibold">Severe anxiety symptoms detected</p>
                  <p className="text-[#B45309] text-sm mt-1">AI recommended immediate counsellor appointment</p>
                  <p className="text-[#D97706] text-xs mt-2 font-medium">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-xl hover:shadow-md transition-all">
                <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#92400E] font-semibold">Repeated distress patterns</p>
                  <p className="text-[#B45309] text-sm mt-1">Student accessing AI support daily for past week</p>
                  <p className="text-[#D97706] text-xs mt-2 font-medium">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] border border-[#93C5FD] rounded-xl hover:shadow-md transition-all">
                <BarChart3 className="w-5 h-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#1E3A8A] font-semibold">Exam period spike detected</p>
                  <p className="text-[#1E40AF] text-sm mt-1">40% increase in stress-related queries</p>
                  <p className="text-[#2563EB] text-xs mt-2 font-medium">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 border border-[#E2E8F0] hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="text-[#1E293B] font-bold text-xl">AI-Generated Insights & Recommendations</h3>
              <p className="text-[#94A3B8] text-sm">Data-driven suggestions for improving student wellbeing</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[#1E293B] font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
                Key Trends
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Academic stress peaks during mid-semester (weeks 6-8) and finals</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Evening hours (6-8 PM) show highest platform usage</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Peer support engagement increased 45% after volunteer training</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#8B5CF6] to-[#4F46E5] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Resource hub videos in regional languages have 3x higher completion rate</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#1E293B] font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#14B8A6]" />
                Recommended Actions
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#14B8A6] to-[#0F9688] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Increase counsellor availability during exam periods</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#14B8A6] to-[#0F9688] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Schedule wellness workshops focusing on academic stress management</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#14B8A6] to-[#0F9688] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Expand peer volunteer program to meet growing demand</span>
                </li>
                <li className="flex items-start gap-3 group hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <span className="w-2 h-2 bg-gradient-to-br from-[#14B8A6] to-[#0F9688] rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-[#475569]">Create more multilingual content for diverse student population</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
