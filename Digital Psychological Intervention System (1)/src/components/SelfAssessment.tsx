import { useState } from 'react';
import { ClipboardList, ArrowRight, ArrowLeft, Heart, CheckCircle, Info, Phone, Calendar, BookOpen, Shield, Pause, X } from 'lucide-react';
import api from '../api/axios';

type AssessmentType = 'PHQ-9' | 'GAD-7' | 'GHQ-12' | null;
type Screen = 'select' | 'disclaimer' | 'questions' | 'results';

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface SelfAssessmentProps {
  onBookAppointment?: () => void;
}

export function SelfAssessment({ onBookAppointment }: SelfAssessmentProps = {}) {
  const [screen, setScreen] = useState<Screen>('select');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [severityResult, setSeverityResult] = useState<{level: string, score: number, color: string, bgColor: string} | null>(null);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const getOptionsForType = (type: AssessmentType) => {
    if (type === 'GHQ-12') {
      return [
        { value: 0, label: 'Better than usual' },
        { value: 1, label: 'Same as usual' },
        { value: 2, label: 'Less than usual' },
        { value: 3, label: 'Much less than usual' }
      ];
    }
    return [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ];
  };

  const assessmentMap: Record<string, number> = {
    'PHQ-9': 1,
    'GAD-7': 2,
    'GHQ-12': 3
  };

  const handleSelectAssessment = async (type: AssessmentType) => {
    setSelectedAssessment(type);
    setScreen('disclaimer');
    setCurrentQuestion(0);
    setAnswers({});
    setSeverityResult(null);

    const qId = type ? assessmentMap[type] : null;
    if (qId) {
      setIsLoading(true);
      try {
        const res = await api.get(`/assessments/${qId}/`);
        const fetchedQuestions = res.data.questions.map((q: any) => ({
          id: q.id.toString(),
          text: q.text,
          options: getOptionsForType(type)
        }));
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error("Failed to fetch assessment from backend", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setQuestions([]);
    }
  };

  const handleStartAssessment = () => {
    setScreen('questions');
  };

  const handleAnswer = async (value: number) => {
    const question = questions[currentQuestion];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submitting the test securely to backend for server-side scoring
      setIsLoading(true);
      try {
        const qId = selectedAssessment ? assessmentMap[selectedAssessment] : 1;
        const res = await api.post('/assessments/submit/', {
          questionnaire_id: qId,
          answers: newAnswers
        });
        
        const label = res.data.severity_label;
        let color = 'text-blue-700';
        let bgColor = 'bg-blue-50';
        
        if (label === 'Minimal') { color = 'text-green-700'; bgColor = 'bg-green-50'; }
        else if (label === 'Mild') { color = 'text-blue-700'; bgColor = 'bg-blue-50'; }
        else if (label === 'Moderate') { color = 'text-amber-700'; bgColor = 'bg-amber-50'; }
        else if (label === 'Moderately Severe') { color = 'text-orange-700'; bgColor = 'bg-orange-50'; }
        else if (label === 'Severe') { color = 'text-red-700'; bgColor = 'bg-red-50'; }

        setSeverityResult({ level: label, score: res.data.total_score, color, bgColor });
      } catch (err) {
        console.error("Failed to submit assessment", err);
        setSeverityResult({ level: "Submission Error", score: 0, color: 'text-red-700', bgColor: 'bg-red-50' });
      } finally {
         setIsLoading(false);
         setScreen('results');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen('results');
    }
  };

  const handleExit = () => {
    setShowPauseModal(false);
    setScreen('select');
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  // Selection Screen
  if (screen === 'select') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-gray-900 mb-2">Mental Health Self-Assessment</h2>
          <p className="text-gray-600">
            Take a moment to check in with yourself. These assessments use standard psychological screening tools to help you understand your wellbeing.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 mb-2">A Safe Space for Self-Reflection</h3>
              <p className="text-gray-700 text-sm">
                These assessments are confidential, completely optional, and designed to help you better understand your mental wellbeing. 
                There are no right or wrong answers—just honest reflections.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => handleSelectAssessment('PHQ-9')}
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl hover:border-purple-300 border-2 border-transparent transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">PHQ-9</h3>
            <p className="text-gray-600 text-sm mb-3">Depression screening - helps identify symptoms of low mood and depression</p>
            <p className="text-purple-600 text-sm">9 questions • ~3 min</p>
          </button>

          <button
            onClick={() => handleSelectAssessment('GAD-7')}
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl hover:border-purple-300 border-2 border-transparent transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">GAD-7</h3>
            <p className="text-gray-600 text-sm mb-3">Anxiety screening - assesses symptoms of anxiety and worry</p>
            <p className="text-purple-600 text-sm">7 questions • ~2 min</p>
          </button>

          <button
            onClick={() => handleSelectAssessment('GHQ-12')}
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl hover:border-purple-300 border-2 border-transparent transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">GHQ-12</h3>
            <p className="text-gray-600 text-sm mb-3">General wellbeing - measures overall mental health and stress levels</p>
            <p className="text-purple-600 text-sm">12 questions • ~3 min</p>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="mb-1"><strong>Privacy First:</strong></p>
              <p className="text-blue-800">
                Your responses are confidential and stored anonymously. You can pause or exit at any time. 
                This is a screening tool, not a medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Disclaimer Screen
  if (screen === 'disclaimer') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>

          <h2 className="text-gray-900 text-center mb-6">Before You Begin: {selectedAssessment}</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-900 mb-2">📋 This is a screening tool, not a diagnosis</p>
              <p className="text-purple-800 text-sm">
                This assessment helps identify symptoms but cannot replace a professional evaluation. 
                Only a qualified healthcare provider can make a diagnosis.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 mb-2">🔒 Your responses are confidential</p>
              <p className="text-blue-800 text-sm">
                We store results anonymously to help improve our services. Your individual responses are private and secure.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-900 mb-2">✨ This is completely optional</p>
              <p className="text-green-800 text-sm">
                You can skip questions, pause, or exit at any time. There's no pressure—take your time and answer honestly.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-900 mb-2">💭 Think about the past 2 weeks</p>
              <p className="text-amber-800 text-sm">
                When answering, consider how you've been feeling over the last two weeks, not just today.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setScreen('select')}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleStartAssessment}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-900">
            <strong>Crisis Support:</strong> If you're in immediate distress, please call <a href="tel:1-800-HELP-NOW" className="underline">1-800-HELP-NOW</a>
          </p>
        </div>
      </div>
    );
  }

  // Questions Screen
  if (screen === 'questions' && questions.length > 0) {
    const question = questions[currentQuestion];

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">{selectedAssessment}</span>
            <span className="text-gray-600 text-sm">Question {currentQuestion + 1} of {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-3">Over the last 2 weeks, how often have you been bothered by:</p>
            <h3 className="text-gray-900 text-xl">{question.text}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all group"
              >
                <span className="text-gray-900 group-hover:text-purple-900">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setShowPauseModal(true)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Pause Modal */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-gray-900 mb-4">Pause Assessment?</h3>
              <p className="text-gray-700 mb-6">
                You can continue from where you left off, or exit to return to the main menu.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={handleExit}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Results Screen
  if (screen === 'results' && selectedAssessment) {
    const answeredQuestions = Object.keys(answers).length;
    const severity = severityResult || { level: 'Unknown', score: 0, bgColor: 'bg-gray-50', color: 'text-gray-700' };

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-gray-900 text-center mb-2">Assessment Complete</h2>
          <p className="text-gray-600 text-center mb-8">Your responses have been securely scored and saved to your history.</p>

          {/* Results Summary */}
          <div className={`${severity.bgColor} border-2 ${severity.color.replace('text-', 'border-')} rounded-lg p-6 mb-8`}>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Your {selectedAssessment} total score is {severity.score}, indicating:</p>
              <p className={`${severity.color} text-3xl font-bold mb-3`}>{severity.level}</p>
              <p className="text-gray-500 text-sm">Based on {answeredQuestions} out of {totalQuestions} questions answered</p>
            </div>
          </div>

          {/* Reassurance */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-purple-900 mb-2">Remember:</p>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• This is a screening tool, not a diagnosis</li>
                  <li>• Everyone experiences ups and downs—you're not alone</li>
                  <li>• Seeking support is a sign of strength</li>
                  <li>• Your mental health matters, and help is available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="text-gray-900 mb-4">Recommended Next Steps</h3>
            
            {(severity.level === 'Minimal' || severity.level === 'Low Distress') && (
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="text-gray-900">Explore Self-Care Resources</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Continue building healthy habits with our wellness resources and relaxation exercises.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    Browse Resources
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <h4 className="text-gray-900">Join Peer Support</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Connect with fellow students for mutual support and community.
                  </p>
                  <button className="w-full px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    Join Community
                  </button>
                </div>
              </div>
            )}

            {(severity.level === 'Mild' || severity.level === 'Moderate' || severity.level === 'Moderate Distress') && (
              <div className="space-y-3">
                <div className="border-2 border-purple-300 rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h4 className="text-gray-900">Book a Counselling Session</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Speaking with a professional counsellor can provide personalized support and coping strategies.
                  </p>
                  <button 
                    onClick={onBookAppointment}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="text-gray-900">Access Support Resources</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Explore guided exercises, coping tools, and wellness content.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    View Resources
                  </button>
                </div>
              </div>
            )}

            {(severity.level === 'Moderately Severe' || severity.level === 'Severe' || severity.level === 'High Distress') && (
              <div className="space-y-3">
                <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <h4 className="text-gray-900">Get Immediate Support</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Your wellbeing is important. Please reach out for professional help right away.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:1-800-273-8255"
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors block text-center"
                    >
                      Call Crisis Hotline Now
                    </a>
                    <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      View All Emergency Resources
                    </button>
                  </div>
                </div>

                <div className="border-2 border-purple-300 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h4 className="text-gray-900">Book Urgent Counselling</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Schedule an appointment with a professional counsellor as soon as possible.
                  </p>
                  <button 
                    onClick={onBookAppointment}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Book Urgent Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setScreen('select')}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Take Another Assessment
          </button>
          <button
            onClick={handleExit}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
}
