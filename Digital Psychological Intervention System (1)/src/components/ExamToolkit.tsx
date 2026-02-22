import { useState, useEffect } from 'react';
import { Timer, Coffee, Brain, Lightbulb, Play, Pause, RotateCcw, Bell } from 'lucide-react';

export function ExamToolkit() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showBreakReminder, setShowBreakReminder] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && pomodoroTime > 0) {
      interval = window.setInterval(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      setShowBreakReminder(true);
      
      // Auto-switch to break or focus
      if (isBreak) {
        setPomodoroTime(25 * 60); // Back to 25 min focus
        setIsBreak(false);
      } else {
        setPomodoroTime(5 * 60); // 5 min break
        setIsBreak(true);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, pomodoroTime, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
  };

  const CALMING_EXERCISES = [
    {
      title: '4-7-8 Breathing',
      description: 'Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times.',
      duration: '2 min',
      icon: Brain
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group from toes to head.',
      duration: '10 min',
      icon: Brain
    },
    {
      title: 'Grounding 5-4-3-2-1',
      description: '5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
      duration: '5 min',
      icon: Brain
    },
    {
      title: 'Positive Affirmations',
      description: 'Repeat: "I am prepared. I am capable. I will do my best."',
      duration: '3 min',
      icon: Lightbulb
    }
  ];

  const PRODUCTIVITY_TIPS = [
    {
      title: 'Plan Your Study Sessions',
      tip: 'Break large topics into smaller chunks. Use the Pomodoro technique for focused study.',
      category: 'Planning'
    },
    {
      title: 'Active Recall Over Re-reading',
      tip: 'Test yourself frequently instead of just re-reading notes. This strengthens memory.',
      category: 'Study Method'
    },
    {
      title: 'Sleep is Non-Negotiable',
      tip: 'Aim for 7-8 hours of sleep. Your brain consolidates memories during sleep.',
      category: 'Wellness'
    },
    {
      title: 'Eat Brain-Boosting Foods',
      tip: 'Include nuts, fruits, vegetables, and stay hydrated. Avoid excess caffeine and sugar.',
      category: 'Nutrition'
    },
    {
      title: 'Create a Study Schedule',
      tip: 'Time-block your day. Include breaks, meals, and exercise. Stick to the routine.',
      category: 'Planning'
    },
    {
      title: 'Minimize Distractions',
      tip: 'Use app blockers, study in quiet spaces, and inform others of your study time.',
      category: 'Focus'
    },
    {
      title: 'Practice Past Papers',
      tip: 'Solve previous years\' questions under timed conditions to build exam confidence.',
      category: 'Preparation'
    },
    {
      title: 'Join Study Groups',
      tip: 'Explaining concepts to peers helps reinforce your own understanding.',
      category: 'Collaboration'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Exam & Academic Stress Toolkit</h2>
        <p className="text-gray-600">
          Tools and techniques to help you stay focused, manage stress, and perform your best.
        </p>
      </div>

      {/* Break Reminder Modal */}
      {showBreakReminder && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-green-900">
                {isBreak ? '🎉 Break time is over! Ready to focus?' : '⏰ Time for a break! You\'ve earned it.'}
              </p>
              <p className="text-green-700 text-sm">
                {isBreak ? 'Start your next focus session' : 'Take 5 minutes to stretch and hydrate'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBreakReminder(false)}
            className="text-green-600 hover:text-green-800 text-2xl"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pomodoro Timer */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Timer className="w-6 h-6 text-purple-600" />
            <h3 className="text-gray-900">Pomodoro Focus Timer</h3>
          </div>

          <div className="text-center mb-6">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-4 ${
              isBreak ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {isBreak ? 'Break Time' : 'Focus Time'}
            </div>
            
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={isBreak ? '#10B981' : '#8B5CF6'}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - pomodoroTime / (isBreak ? 5 * 60 : 25 * 60))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-900 text-4xl">{formatTime(pomodoroTime)}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-900 mb-2">How it works:</p>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Focus for 25 minutes without distractions</li>
              <li>• Take a 5-minute break</li>
              <li>• Repeat 4 times, then take a longer 15-30 min break</li>
            </ul>
          </div>
        </div>

        {/* Study Break Reminders */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Coffee className="w-6 h-6 text-blue-600" />
            <h3 className="text-gray-900">Study Break Ideas</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 mb-2">☕ Hydrate & Snack (5 min)</p>
              <p className="text-blue-700 text-sm">Drink water, have a healthy snack. Avoid heavy meals during study breaks.</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-900 mb-2">🧘 Stretch & Move (5-10 min)</p>
              <p className="text-green-700 text-sm">Do simple stretches, walk around, or try desk yoga to refresh your body.</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-purple-900 mb-2">👁️ Eye Rest (2-3 min)</p>
              <p className="text-purple-700 text-sm">Follow 20-20-20 rule: Every 20 min, look 20 feet away for 20 seconds.</p>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-pink-900 mb-2">🎵 Music Break (5 min)</p>
              <p className="text-pink-700 text-sm">Listen to your favorite song or calming music to reset your mind.</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-900 mb-2">🌬️ Fresh Air (5-10 min)</p>
              <p className="text-amber-700 text-sm">Step outside, breathe deeply, and get some natural light.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Anxiety Calming Exercises */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-gray-900">Exam Anxiety Calming Exercises</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CALMING_EXERCISES.map((exercise, index) => {
            const Icon = exercise.icon;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-8 h-8 text-purple-600" />
                  <span className="text-gray-500 text-sm">{exercise.duration}</span>
                </div>
                <h4 className="text-gray-900 mb-2">{exercise.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                <button className="w-full px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  Start Exercise
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Productivity Tips */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-amber-600" />
          <h3 className="text-gray-900">Productivity Tips for Exam Success</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {PRODUCTIVITY_TIPS.map((tip, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900">{tip.title}</h4>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full whitespace-nowrap">
                  {tip.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-lg p-6">
        <h4 className="text-gray-900 mb-3">Remember During Exams:</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-gray-900">Quality over Quantity</p>
              <p className="text-gray-600">Focused study beats marathon sessions</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">💪</span>
            <div>
              <p className="text-gray-900">Believe in Yourself</p>
              <p className="text-gray-600">You've prepared, trust your abilities</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🌟</span>
            <div>
              <p className="text-gray-900">Progress, Not Perfection</p>
              <p className="text-gray-600">Every small step counts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
