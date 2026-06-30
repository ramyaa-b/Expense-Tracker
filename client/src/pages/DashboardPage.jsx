import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('');
  const { user } = useAuth();

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const params = month ? { month } : {};
      const res = await api.get('/summary', { params });
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSummary(); }, [month]);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {getGreeting()}, {user?.name?.split(' ')[0]} 
            </h1>
            <p className="text-slate-500 text-sm mt-1">Here's your financial overview</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {month && (
              <button
                onClick={() => setMonth('')}
                className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <SummaryCards
              totalIncome={summary?.totalIncome || 0}
              totalExpenses={summary?.totalExpenses || 0}
              netBalance={summary?.netBalance || 0}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpensePieChart data={summary?.byCategory || []} />
              <MonthlyBarChart data={summary?.monthly || []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;