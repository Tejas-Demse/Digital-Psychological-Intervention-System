import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Calendar, 
  Users, 
  AlertTriangle,
  LogOut,
  Heart,
  Clock,
  Activity,
  Plus
} from 'lucide-react';
import type { User } from '../App';

interface CounselorDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Appointment {
  id: string;
  student__username?: string;
  student?: { username: string };
  date?: string;
  start_time?: string;
  time_slot?: {
    start_time: string;
    end_time: string;
  };
  status: string;
  meeting_link: string | null;
}

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export function CounselorDashboard({ user, onLogout }: CounselorDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [atRiskCount, setAtRiskCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [newSlotStart, setNewSlotStart] = useState('');
  const [newSlotEnd, setNewSlotEnd] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, timeSlotsRes, atRiskRes] = await Promise.all([
        api.get('/appointments/counselor/').catch(() => ({ data: [] })),
        api.get('/timeslots/').catch(() => ({ data: [] })),
        api.get('/users/at-risk/').catch(() => ({ data: [] }))
      ]);

      setAppointments(appointmentsRes.data || []);
      setTimeSlots(timeSlotsRes.data || []);
      // Assuming at-risk gives a list or object with count
      setAtRiskCount(Array.isArray(atRiskRes.data) ? atRiskRes.data.length : (atRiskRes.data.count || 0));
    } catch (error) {
      console.error("Error fetching counselor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTimeSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotStart || !newSlotEnd) return;
    try {
      await api.post('/timeslots/', {
        start_time: newSlotStart,
        end_time: newSlotEnd
      });
      setNewSlotStart('');
      setNewSlotEnd('');
      fetchDashboardData(); // Refresh list
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
  };

  const upcomingSessions = appointments.filter(app => app.status === 'scheduled').length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header aligned with StudentDashboard style */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-[#1E293B] text-xl font-bold">Counselor Dashboard</h1>
                <p className="text-[#64748B] text-sm flex items-center gap-2">
                  Welcome, <span className="text-[#4F46E5] font-semibold">Dr. {user.name}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Overview Cards */}
        <section>
          <h2 className="text-[#1E293B] text-2xl font-bold mb-4">Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:border-[#4F46E5] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5]/10 to-[#6366F1]/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-[#4F46E5]" />
                </div>
              </div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Total Appointments</p>
              <p className="text-[#1E293B] text-3xl font-bold">{appointments.length}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:border-[#8B5CF6] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-[#8B5CF6]" />
                </div>
              </div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Upcoming Sessions</p>
              <p className="text-[#1E293B] text-3xl font-bold">{upcomingSessions}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E2E8F0] hover:border-[#EF4444] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-[#EF4444]" />
                </div>
              </div>
              <p className="text-[#64748B] text-sm font-medium mb-1">At-Risk Students</p>
              <p className="text-[#1E293B] text-3xl font-bold">{atRiskCount}</p>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Manage Time Slots Section */}
          <section className="col-span-1 border border-[#E2E8F0] bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[#1E293B] font-bold text-lg mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#8B5CF6]" />
              Manage Time Slots
            </h3>
            <form onSubmit={handleAddTimeSlot} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">Start Time</label>
                <input 
                  type="datetime-local" 
                  value={newSlotStart}
                  onChange={(e) => setNewSlotStart(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">End Time</label>
                <input 
                  type="datetime-local" 
                  value={newSlotEnd}
                  onChange={(e) => setNewSlotEnd(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium py-2 rounded-lg transition-colors"
              >
                Add Time Slot
              </button>
            </form>
            
            <div>
              <h4 className="text-sm font-semibold text-[#64748B] mb-3">Your Upcoming Slots</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {timeSlots.length === 0 ? (
                  <p className="text-sm text-[#94A3B8]">No time slots created yet.</p>
                ) : (
                  timeSlots.map(slot => (
                    <div key={slot.id} className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex justify-between items-center">
                      <div className="text-sm text-[#1E293B]">
                        <div>{new Date(slot.start_time).toLocaleString()}</div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${slot.is_booked ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {slot.is_booked ? 'Booked' : 'Available'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Upcoming Appointments Table */}
          <section className="col-span-2 border border-[#E2E8F0] bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-[#1E293B] font-bold text-lg mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4F46E5]" />
              Appointments
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="pb-3 text-sm font-semibold text-[#64748B]">Student</th>
                    <th className="pb-3 text-sm font-semibold text-[#64748B]">Date & Time</th>
                    <th className="pb-3 text-sm font-semibold text-[#64748B]">Status</th>
                    <th className="pb-3 text-sm font-semibold text-[#64748B] text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-sm text-[#94A3B8]">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map(app => (
                      <tr key={app.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 text-sm text-[#1E293B] font-medium">
                          {app.student?.username || app.student__username || 'Unknown'}
                        </td>
                        <td className="py-3 text-sm text-[#64748B]">
                          {app.time_slot ? new Date(app.time_slot.start_time).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            app.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                            app.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          {app.meeting_link ? (
                            <a href={app.meeting_link} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium">
                              Join Meeting
                            </a>
                          ) : (
                            <span className="text-sm text-[#94A3B8]">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
