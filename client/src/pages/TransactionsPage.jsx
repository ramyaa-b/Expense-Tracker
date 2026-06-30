import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import api from '../utils/api';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [month, setMonth] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = month ? { month } : {};
      const res = await api.get('/transactions', { params });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, [month]);

  const filtered = transactions.filter(t => filter === 'all' || t.type === filter);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
            <p className="text-slate-500 text-sm mt-1">Track all your income and expenses</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Transaction
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-slate-800">{transactions.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Income</p>
            <p className="text-2xl font-bold text-emerald-600">+₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
            <p className="text-xs text-slate-400 font-medium mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-500">-₹{totalExpense.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)}
            className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {['all', 'income', 'expense'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                {f}
              </button>
            ))}
          </div>
          {month && (
            <button onClick={() => setMonth('')} className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm">
              Clear filter
            </button>
          )}
          <p className="text-sm text-slate-400 ml-auto">{filtered.length} records</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <TransactionList transactions={filtered} onDelete={fetchTransactions} />
        )}
      </div>

      {showForm && <TransactionForm onClose={() => setShowForm(false)} onSuccess={fetchTransactions} />}
    </div>
  );
};

export default TransactionsPage;