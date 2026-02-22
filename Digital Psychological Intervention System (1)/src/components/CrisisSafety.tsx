import { useState } from 'react';
import { Phone, AlertCircle, Heart, Shield, MapPin, Clock, Languages, ExternalLink } from 'lucide-react';

interface Helpline {
  name: string;
  number: string;
  description: string;
  languages: string[];
  available: string;
  category: 'national' | 'mental-health' | 'student' | 'emergency';
}

const HELPLINES: Helpline[] = [
  {
    name: 'National Suicide Prevention Helpline',
    number: '1-800-273-8255',
    description: 'Free, confidential support for people in distress, prevention and crisis resources.',
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    available: '24/7',
    category: 'national'
  },
  {
    name: 'iCall - Tata Institute Helpline',
    number: '9152987821',
    description: 'Psychosocial helpline providing counseling for various emotional issues.',
    languages: ['English', 'Hindi', 'Marathi'],
    available: 'Mon-Sat, 8 AM - 10 PM',
    category: 'mental-health'
  },
  {
    name: 'Vandrevala Foundation',
    number: '1860-2662-345 / 1800-2333-330',
    description: 'Mental health support and crisis intervention services.',
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'],
    available: '24/7',
    category: 'mental-health'
  },
  {
    name: 'AASRA',
    number: '91-22-27546669',
    description: 'Crisis intervention center providing emotional support to those in distress.',
    languages: ['English', 'Hindi'],
    available: '24/7',
    category: 'mental-health'
  },
  {
    name: 'Sneha Foundation',
    number: '044-24640050',
    description: 'Suicide prevention center offering emotional support and counseling.',
    languages: ['English', 'Tamil', 'Hindi'],
    available: '24/7',
    category: 'mental-health'
  },
  {
    name: 'Fortis Stress Helpline',
    number: '8376804102',
    description: 'Professional counseling for stress, anxiety, and depression.',
    languages: ['English', 'Hindi'],
    available: '24/7',
    category: 'mental-health'
  },
  {
    name: 'Connecting NGO',
    number: '9922001122 / 9922004305',
    description: 'Emotional support for people in distress, facing depression and suicidal tendencies.',
    languages: ['English', 'Hindi', 'Marathi'],
    available: '12 PM - 8 PM',
    category: 'mental-health'
  },
  {
    name: 'Mann Talks (Shanthi Foundation)',
    number: '080-46110007',
    description: 'Mental health support for students and young adults.',
    languages: ['English', 'Hindi', 'Kannada'],
    available: '24/7',
    category: 'student'
  },
  {
    name: 'Emergency Services (Police)',
    number: '100',
    description: 'Immediate emergency police assistance.',
    languages: ['All Indian Languages'],
    available: '24/7',
    category: 'emergency'
  },
  {
    name: 'Emergency Medical Services',
    number: '102 / 108',
    description: 'Emergency medical and ambulance services.',
    languages: ['All Indian Languages'],
    available: '24/7',
    category: 'emergency'
  },
  {
    name: 'Women Helpline',
    number: '1091 / 181',
    description: 'Support for women in distress or danger.',
    languages: ['All Indian Languages'],
    available: '24/7',
    category: 'emergency'
  }
];

export function CrisisSafety() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);

  const filteredHelplines = selectedCategory === 'all' 
    ? HELPLINES 
    : HELPLINES.filter(h => h.category === selectedCategory);

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
    setShowEmergencyConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#1E293B] text-2xl font-bold mb-2">Crisis & Safety Module</h2>
        <p className="text-[#64748B]">
          Immediate help is available. You are not alone, and support is just a call away.
        </p>
      </div>

      {/* You Are Not Alone Banner */}
      <div className="bg-gradient-to-r from-[#FCE7F3] via-[#EDE9FE] to-[#DBEAFE] border-2 border-[#C084FC] rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <Heart className="w-12 h-12 text-[#EC4899] flex-shrink-0" fill="currentColor" />
          <div>
            <h3 className="text-[#1E293B] font-bold text-xl mb-2">You Are Not Alone ❤️</h3>
            <p className="text-[#475569] mb-4">
              Whatever you're going through, there are people who care and want to help. 
              Your feelings are valid, and reaching out is a sign of strength, not weakness.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="text-[#1E293B] font-semibold">This is temporary</p>
                  <p className="text-[#64748B]">Difficult feelings pass with time and support</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">💪</span>
                <div>
                  <p className="text-[#1E293B] font-semibold">You are stronger than you think</p>
                  <p className="text-[#64748B]">You've overcome challenges before</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🤝</span>
                <div>
                  <p className="text-[#1E293B] font-semibold">Help is available</p>
                  <p className="text-[#64748B]">Trained professionals are ready to support you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* One-Tap Emergency Help */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#FCA5A5]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-[#EF4444]" />
            </div>
            <h3 className="text-[#1E293B] font-bold text-xl">Emergency Help</h3>
          </div>

          <p className="text-[#64748B] mb-6">
            If you or someone you know is in immediate danger or having thoughts of self-harm, 
            please reach out for help right now.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setShowEmergencyConfirm(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-xl hover:from-[#DC2626] hover:to-[#B91C1C] transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl font-bold transform hover:-translate-y-0.5"
            >
              <Phone className="w-6 h-6" />
              Call National Suicide Prevention Helpline
            </button>

            <a
              href="tel:100"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl hover:from-[#EA580C] hover:to-[#C2410C] transition-all flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Phone className="w-6 h-6" />
              Call Emergency Services (100)
            </a>

            <a
              href="tel:102"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl hover:from-[#2563EB] hover:to-[#1D4ED8] transition-all flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Phone className="w-6 h-6" />
              Call Medical Emergency (102)
            </a>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-xl">
            <p className="text-[#92400E] text-sm font-bold mb-2">
              If you're in immediate danger:
            </p>
            <ul className="text-[#B45309] text-sm space-y-1.5 font-medium">
              <li>• Call emergency services (100 or 102)</li>
              <li>• Go to the nearest hospital emergency room</li>
              <li>• Tell a trusted friend or family member</li>
              <li>• Don't stay alone - reach out to someone</li>
            </ul>
          </div>
        </div>

        {/* Safety Plan Quick Access */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#8B5CF6]" />
            </div>
            <h3 className="text-[#1E293B] font-bold text-xl">Safety Resources</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-[#EDE9FE] to-[#DDD6FE] border border-[#C084FC] rounded-xl">
              <h4 className="text-[#6B21A8] font-bold mb-2">Warning Signs to Watch For</h4>
              <ul className="text-[#7C3AED] text-sm space-y-1.5 font-medium">
                <li>• Talking about wanting to die or hurt yourself</li>
                <li>• Feeling hopeless or having no purpose</li>
                <li>• Feeling trapped or in unbearable pain</li>
                <li>• Withdrawing from friends and activities</li>
                <li>• Extreme mood swings or increased anxiety</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] border border-[#6EE7B7] rounded-xl">
              <h4 className="text-[#065F46] font-bold mb-2">Immediate Coping Strategies</h4>
              <ul className="text-[#047857] text-sm space-y-1.5 font-medium">
                <li>• Call a helpline - talking helps</li>
                <li>• Practice deep breathing exercises</li>
                <li>• Reach out to someone you trust</li>
                <li>• Remove immediate means of harm</li>
                <li>• Focus on getting through the next hour</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] border border-[#93C5FD] rounded-xl">
              <h4 className="text-[#1E3A8A] font-bold mb-2">Create Your Safety Plan</h4>
              <p className="text-[#1E40AF] text-sm mb-3 font-medium">
                List trusted contacts, coping activities, and reasons for living.
              </p>
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white rounded-xl hover:from-[#2563EB] hover:to-[#1D4ED8] transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Create My Safety Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Helpline Directory */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E2E8F0]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-[#1E293B] font-bold text-xl">India Helpline Directory</h3>
            <p className="text-[#64748B] text-sm mt-1">Confidential support available in multiple languages</p>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-white hover:border-[#4F46E5] focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all outline-none text-[#1E293B] font-medium"
          >
            <option value="all">All Helplines</option>
            <option value="national">National Helplines</option>
            <option value="mental-health">Mental Health</option>
            <option value="student">Student Support</option>
            <option value="emergency">Emergency Services</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredHelplines.map((helpline, index) => (
            <div
              key={index}
              className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#8B5CF6] hover:shadow-lg transition-all bg-gradient-to-br from-white to-[#F8FAFC]"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[#1E293B] font-bold flex-1">{helpline.name}</h4>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap ml-2 ${
                  helpline.category === 'emergency' 
                    ? 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] text-[#991B1B] border border-[#FCA5A5]'
                    : helpline.category === 'mental-health'
                    ? 'bg-gradient-to-r from-[#EDE9FE] to-[#DDD6FE] text-[#6B21A8] border border-[#C084FC]'
                    : helpline.category === 'student'
                    ? 'bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] text-[#1E3A8A] border border-[#93C5FD]'
                    : 'bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] text-[#065F46] border border-[#6EE7B7]'
                }`}>
                  {helpline.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </div>

              <p className="text-[#64748B] text-sm mb-4">{helpline.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                  <Phone className="w-4 h-4 text-[#8B5CF6]" />
                  <a 
                    href={`tel:${helpline.number}`}
                    className="text-[#8B5CF6] hover:text-[#7C3AED] font-bold"
                  >
                    {helpline.number}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{helpline.available}</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-[#64748B]">
                  <Languages className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{helpline.languages.join(', ')}</span>
                </div>
              </div>

              <a
                href={`tel:${helpline.number}`}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E2E8F0]">
        <h3 className="text-[#1E293B] font-bold text-xl mb-6">Additional Support Resources</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 border border-[#E2E8F0] rounded-xl hover:border-[#8B5CF6] transition-all hover:shadow-lg bg-gradient-to-br from-white to-[#F8FAFC]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/20 rounded-xl flex items-center justify-center mb-3">
              <MapPin className="w-7 h-7 text-[#8B5CF6]" />
            </div>
            <h4 className="text-[#1E293B] font-bold mb-2">Nearest Hospital</h4>
            <p className="text-[#64748B] text-sm mb-4">Find emergency psychiatric services near you.</p>
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <ExternalLink className="w-4 h-4" />
              Find Location
            </button>
          </div>

          <div className="p-5 border border-[#E2E8F0] rounded-xl hover:border-[#EC4899] transition-all hover:shadow-lg bg-gradient-to-br from-white to-[#F8FAFC]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#EC4899]/10 to-[#F472B6]/20 rounded-xl flex items-center justify-center mb-3">
              <Heart className="w-7 h-7 text-[#EC4899]" />
            </div>
            <h4 className="text-[#1E293B] font-bold mb-2">Crisis Chat</h4>
            <p className="text-[#64748B] text-sm mb-4">Prefer texting? Connect with counselors via chat.</p>
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl hover:from-[#DB2777] hover:to-[#BE185D] transition-all flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <ExternalLink className="w-4 h-4" />
              Start Chat
            </button>
          </div>

          <div className="p-5 border border-[#E2E8F0] rounded-xl hover:border-[#14B8A6] transition-all hover:shadow-lg bg-gradient-to-br from-white to-[#F8FAFC]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#14B8A6]/10 to-[#2DD4BF]/20 rounded-xl flex items-center justify-center mb-3">
              <Shield className="w-7 h-7 text-[#14B8A6]" />
            </div>
            <h4 className="text-[#1E293B] font-bold mb-2">Support Groups</h4>
            <p className="text-[#64748B] text-sm mb-4">Connect with others who understand what you're going through.</p>
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#14B8A6] to-[#0F9688] text-white rounded-xl hover:from-[#0F9688] hover:to-[#0D7C66] transition-all flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <ExternalLink className="w-4 h-4" />
              Find Groups
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Confirmation Modal */}
      {showEmergencyConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#E2E8F0]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h3 className="text-[#1E293B] font-bold text-2xl mb-4 text-center">Confirm Emergency Call</h3>
            <p className="text-[#64748B] mb-6 text-center">
              You're about to call the National Suicide Prevention Helpline. 
              This call is free and confidential. Trained counselors are available to help you.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEmergencyCall('1-800-273-8255')}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-xl hover:from-[#DC2626] hover:to-[#B91C1C] transition-all font-bold shadow-lg hover:shadow-xl"
              >
                Call Now
              </button>
              <button
                onClick={() => setShowEmergencyConfirm(false)}
                className="flex-1 px-6 py-3.5 bg-[#F1F5F9] text-[#475569] rounded-xl hover:bg-[#E2E8F0] transition-all font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}