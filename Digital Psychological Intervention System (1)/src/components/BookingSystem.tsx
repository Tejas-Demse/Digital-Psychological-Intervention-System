import { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, Phone, Video, MapPin } from 'lucide-react';
import api from '../api/axios';

interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  counselor_id: number;
  counselor?: {
    id: number;
    name: string;
    department: string;
  };
}

interface Appointment {
  id: string | number;
  counsellor: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
  meeting_link?: string;
}

export function BookingSystem() {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('video');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const res = await api.get('/appointments/available/');
      setAvailableSlots(res.data);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique counselors from available slots
  const counselors = Array.from(new Set(availableSlots.map(s => s.counselor?.id)))
    .map(id => availableSlots.find(s => s.counselor?.id === id)?.counselor)
    .filter(Boolean) as {id: number, name: string, department: string}[];

  // Get available dates for the selected counselor
  const availableDates = Array.from(
    new Set(
      availableSlots
        .filter(s => s.counselor?.id.toString() === selectedCounsellor)
        .map(s => s.start_time.split('T')[0])
    )
  ).sort();

  // Get times for the selected counselor and date
  const availableTimes = availableSlots.filter(
    s => s.counselor?.id.toString() === selectedCounsellor && s.start_time.startsWith(selectedDate)
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!selectedTimeSlotId) {
       setFormError("Please select a valid time slot.");
       return;
    }

    try {
      const res = await api.post('/appointments/book/', {
        time_slot_id: selectedTimeSlotId,
        notes: `Preference: ${selectedType}`
      });
      
      const counselorName = availableSlots.find(s => s.id.toString() === selectedTimeSlotId)?.counselor?.name || 'Counselor';

      const newAppointment: Appointment = {
        id: res.data.id,
        counsellor: counselorName,
        date: selectedDate,
        time: new Date(availableSlots.find(s => s.id.toString() === selectedTimeSlotId)!.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: selectedType,
        status: 'upcoming',
        meeting_link: res.data.meeting_link
      };

      setAppointments(prev => [...prev, newAppointment]);
      setShowSuccess(true);
      
      // Reset form and refresh slots
      setSelectedCounsellor('');
      setSelectedDate('');
      setSelectedTimeSlotId('');
      fetchAvailableSlots();
      
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      setFormError(err.response?.data?.error || "Failed to book appointment. Please try again.");
    }
  };

  if (loading) {
     return <div className="text-center p-8 text-gray-500">Loading scheduling system...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#1E293B] text-2xl font-bold mb-2">Confidential Booking System</h2>
        <p className="text-[#64748B]">
          Book a confidential appointment with our professional counsellors. All sessions are private and secure.
        </p>
      </div>

      {showSuccess && (
        <div className="bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] border border-[#6EE7B7] rounded-xl p-5 flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 bg-[#10B981]/20 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-[#065F46]" />
          </div>
          <p className="text-[#065F46] font-semibold">
            Appointment booked successfully! You'll receive a confirmation email shortly.
          </p>
        </div>
      )}

      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-[#E2E8F0]">
          <h3 className="text-[#1E293B] font-bold text-xl mb-6">Book New Appointment</h3>
          
          <form onSubmit={handleBooking} className="space-y-5">
            {/* Counsellor Selection */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-2">
                Select Counsellor
              </label>
              <select
                value={selectedCounsellor}
                onChange={(e) => {
                  setSelectedCounsellor(e.target.value);
                  setSelectedDate('');
                  setSelectedTimeSlotId('');
                }}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B]"
                required
              >
                <option value="">Choose a counsellor...</option>
                {counselors.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-2">
                Available Dates
              </label>
              <select
                value={selectedDate}
                onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTimeSlotId('');
                }}
                disabled={!selectedCounsellor}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B] disabled:opacity-50"
                required
              >
                <option value="">Select a date...</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-2">
                Available Times
              </label>
              <select
                value={selectedTimeSlotId}
                onChange={(e) => setSelectedTimeSlotId(e.target.value)}
                disabled={!selectedDate}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B] disabled:opacity-50"
                required
              >
                <option value="">Choose a time...</option>
                {availableTimes.map(slot => {
                    const timeString = new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return <option key={slot.id} value={slot.id}>{timeString}</option>;
                })}
              </select>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-3">
                Session Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedType('video')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedType === 'video'
                      ? 'border-[#8B5CF6] bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE] shadow-md'
                      : 'border-[#E2E8F0] hover:border-[#C084FC] bg-white'
                  }`}
                >
                  <Video className={`w-6 h-6 mx-auto mb-2 ${selectedType === 'video' ? 'text-[#8B5CF6]' : 'text-[#64748B]'}`} />
                  <p className={`text-sm font-semibold ${selectedType === 'video' ? 'text-[#6B21A8]' : 'text-[#64748B]'}`}>Video</p>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('phone')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedType === 'phone'
                      ? 'border-[#14B8A6] bg-gradient-to-br from-[#CCFBF1] to-[#99F6E4] shadow-md'
                      : 'border-[#E2E8F0] hover:border-[#2DD4BF] bg-white'
                  }`}
                >
                  <Phone className={`w-6 h-6 mx-auto mb-2 ${selectedType === 'phone' ? 'text-[#14B8A6]' : 'text-[#64748B]'}`} />
                  <p className={`text-sm font-semibold ${selectedType === 'phone' ? 'text-[#0F766E]' : 'text-[#64748B]'}`}>Phone</p>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('in-person')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedType === 'in-person'
                      ? 'border-[#4F46E5] bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] shadow-md'
                      : 'border-[#E2E8F0] hover:border-[#6366F1] bg-white'
                  }`}
                >
                  <MapPin className={`w-6 h-6 mx-auto mb-2 ${selectedType === 'in-person' ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
                  <p className={`text-sm font-semibold ${selectedType === 'in-person' ? 'text-[#3730A3]' : 'text-[#64748B]'}`}>In-Person</p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedTimeSlotId}
              className="w-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white py-3.5 rounded-xl hover:from-[#4338CA] hover:to-[#7C3AED] transition-all shadow-lg hover:shadow-xl font-bold transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          </form>

          {/* Emergency Contact */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border border-[#FCA5A5] rounded-xl">
            <p className="text-[#991B1B] font-bold mb-1">Need immediate help?</p>
            <p className="text-[#B91C1C] font-semibold">Crisis Hotline: 1-800-HELP-NOW (24/7)</p>
          </div>
        </div>

        {/* My Appointments */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-[#E2E8F0]">
          <h3 className="text-[#1E293B] font-bold text-xl mb-6">My Recent Bookings</h3>
          
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#94A3B8]" />
                </div>
                <p className="text-[#94A3B8]">No bookings made in this session yet.</p>
              </div>
            ) : (
              appointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#8B5CF6] hover:shadow-lg transition-all bg-gradient-to-br from-white to-[#F8FAFC]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-[#8B5CF6]" />
                      </div>
                      <span className="text-[#1E293B] font-bold">{appointment.counsellor}</span>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] text-[#1E3A8A] border border-[#93C5FD]">
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2.5 text-[#64748B]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                      <span className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#8B5CF6]" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {appointment.type === 'video' && <Video className="w-4 h-4 text-[#8B5CF6]" />}
                      {appointment.type === 'phone' && <Phone className="w-4 h-4 text-[#8B5CF6]" />}
                      {appointment.type === 'in-person' && <MapPin className="w-4 h-4 text-[#8B5CF6]" />}
                      <span className="capitalize font-medium">{appointment.type} Session</span>
                    </div>
                     {appointment.meeting_link && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                           <a href={appointment.meeting_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                                Join Meeting Link
                           </a>
                        </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}