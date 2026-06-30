import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BudgetCard from '../components/BudgetCard';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Education', 'Entertainment', 'Rent', 'Other'];

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [category, setCategory] = useState('Food');
  const [limit, setLimit] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [budgetRes, transRes] = await Promise.all([
        api.get('/budgets', { params: { month } }),
        api.get('/transactions', { params: { month } })
      ]);
      setBudgets(budgetRes.data);
      setTransactions(transRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [month]);

  const getSpent = (cat) =>
    transactions.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + getSpent(b.category), 0);
  const overBudget = budgets.filter(b => getSpent(b.category) > b.limit).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/budgets', { category, limit: Number(limit), month });
      toast.success('Budget saved successfully');
      setLimit('');
      fetchData();
    } catch {
      toast.error('Failed to save budget');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Budgets</h1>
            <p className="text-slate-500 text-sm mt-1">Set and track your monthly spending limits</p>
          </div>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)}
            className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
        </div>

        {/* Overview Stats */}
        {budgets.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
              <p className="text-xs text-slate-400 font-medium mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-slate-800">₹{totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
              <p className="text-xs text-slate-400 font-medium mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-red-500">₹{totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
              <p className="text-xs text-slate-400 font-medium mb-1">Over Budget</p>
              <p className={`text-2xl font-bold ${overBudget > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {overBudget} {overBudget === 1 ? 'category' : 'categories'}
              </p>
            </div>
          </div>
        )}

        {/* Set Budget Form */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Set Budget Limit</h2>
          <p className="text-sm text-slate-400 mb-4">Define spending limits for each category</p>
          <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <div className="relative flex-1 min-w-40">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input type="number" required min="1" value={limit} onChange={(e) => setLimit(e.target.value)}
                placeholder="Budget limit"
                className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition text-sm shadow-sm">
              Save Budget
            </button>
          </form>
        </div>

        {/* Budget Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : budgets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4v4l3 3"/>
              </svg>
            </div>
            <p className="text-slate-600 font-medium">No budgets set</p>
            <p className="text-slate-400 text-sm mt-1">Use the form above to set your spending limits</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map(b => (
              <BudgetCard key={b._id} category={b.category} limit={b.limit} spent={getSpent(b.category)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetsPage;