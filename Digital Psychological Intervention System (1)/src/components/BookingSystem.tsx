import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, Phone, Video, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  counsellor: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const COUNSELLORS = [
  { id: '1', name: 'Dr. Sarah Williams', specialty: 'Anxiety & Stress Management', available: true },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Depression & Mood Disorders', available: true },
  { id: '3', name: 'Dr. Priya Patel', specialty: 'Academic Pressure & Performance', available: false },
  { id: '4', name: 'Dr. James Thompson', specialty: 'Relationship & Social Issues', available: true }
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export function BookingSystem() {
  const [selectedCounsellor, setSelectedCounsellor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('video');
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      counsellor: 'Dr. Sarah Williams',
      date: '2024-12-28',
      time: '10:00 AM',
      type: 'video',
      status: 'upcoming'
    }
  ]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const counsellor = COUNSELLORS.find(c => c.id === selectedCounsellor);
    if (!counsellor) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counsellor: counsellor.name,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'upcoming'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowSuccess(true);
    
    // Reset form
    setSelectedCounsellor('');
    setSelectedDate('');
    setSelectedTime('');
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

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
                onChange={(e) => setSelectedCounsellor(e.target.value)}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B]"
                required
              >
                <option value="">Choose a counsellor...</option>
                {COUNSELLORS.map(counsellor => (
                  <option 
                    key={counsellor.id} 
                    value={counsellor.id}
                    disabled={!counsellor.available}
                  >
                    {counsellor.name} - {counsellor.specialty} {!counsellor.available && '(Unavailable)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B]"
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-[#1E293B] font-semibold mb-2">
                Preferred Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B]"
                required
              >
                <option value="">Choose a time...</option>
                {TIME_SLOTS.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
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
              className="w-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white py-3.5 rounded-xl hover:from-[#4338CA] hover:to-[#7C3AED] transition-all shadow-lg hover:shadow-xl font-bold transform hover:-translate-y-0.5"
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
          <h3 className="text-[#1E293B] font-bold text-xl mb-6">My Appointments</h3>
          
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#94A3B8]" />
                </div>
                <p className="text-[#94A3B8]">No appointments scheduled</p>
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
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      appointment.status === 'upcoming'
                        ? 'bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] text-[#1E3A8A] border border-[#93C5FD]'
                        : appointment.status === 'completed'
                        ? 'bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] text-[#065F46] border border-[#6EE7B7]'
                        : 'bg-gradient-to-r from-[#F1F5F9] to-[#E2E8F0] text-[#475569] border border-[#CBD5E1]'
                    }`}>
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
                  </div>

                  {appointment.status === 'upcoming' && (
                    <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex gap-3">
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all font-bold shadow-md hover:shadow-lg">
                        Reschedule
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-[#F1F5F9] text-[#475569] rounded-xl hover:bg-[#E2E8F0] transition-all font-bold">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}