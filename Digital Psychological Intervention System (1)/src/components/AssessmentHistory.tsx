import { useState, useEffect } from 'react';
import { Activity, Calendar, FileText } from 'lucide-react';
import api from '../api/axios';

interface Submission {
  id: number;
  questionnaire_title: string;
  total_score: number;
  severity_label: string;
  submitted_at: string;
}

export function AssessmentHistory() {
  const [history, setHistory] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/assessments/history/');
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your progress...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Your Progress History</h2>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't taken any assessments yet. Take one from the 'Take Test' tab to see your progress.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200" style={{ borderBottomWidth: '1px' }}>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Assessment</th>
                <th className="p-4 font-semibold text-gray-600">Score</th>
                <th className="p-4 font-semibold text-gray-600">Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((sub) => {
                const date = new Date(sub.submitted_at).toLocaleDateString();
                let colorClass = 'text-blue-700 bg-blue-50';
                if (sub.severity_label === 'Minimal') colorClass = 'text-green-700 bg-green-50';
                else if (sub.severity_label === 'Mild') colorClass = 'text-blue-700 bg-blue-50';
                else if (sub.severity_label === 'Moderate') colorClass = 'text-amber-700 bg-amber-50';
                else if (sub.severity_label === 'Moderately Severe') colorClass = 'text-orange-700 bg-orange-50';
                else if (sub.severity_label === 'Severe') colorClass = 'text-red-700 bg-red-50';

                return (
                  <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50" style={{ borderBottomWidth: '1px' }}>
                    <td className="p-4 text-gray-600 text-sm">
                       <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {date}</span>
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                       <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400" /> {sub.questionnaire_title}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">{sub.total_score}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                        {sub.severity_label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
