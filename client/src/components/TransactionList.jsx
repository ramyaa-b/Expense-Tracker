import api from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Shopping: 'bg-purple-100 text-purple-700',
  Bills: 'bg-yellow-100 text-yellow-700',
  Health: 'bg-green-100 text-green-700',
  Education: 'bg-indigo-100 text-indigo-700',
  Entertainment: 'bg-pink-100 text-pink-700',
  Rent: 'bg-red-100 text-red-700',
  Salary: 'bg-emerald-100 text-emerald-700',
  Freelance: 'bg-teal-100 text-teal-700',
  Business: 'bg-cyan-100 text-cyan-700',
  Investment: 'bg-violet-100 text-violet-700',
  Gift: 'bg-rose-100 text-rose-700',
  Other: 'bg-slate-100 text-slate-700',
};

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      toast.success('Transaction deleted');
      onDelete();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="12" y1="18" x2="12" y2="12"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        </div>
        <p className="text-slate-600 font-medium">No transactions found</p>
        <p className="text-slate-400 text-sm mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-50">
        {transactions.map((t) => (
          <div key={t._id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition group">
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.type === 'income' ? '#10b981' : '#ef4444'} strokeWidth="2.5">
                  {t.type === 'income'
                    ? <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>
                    : <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>
                  }
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-800">{t.category}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[t.category] || 'bg-slate-100 text-slate-700'}`}>
                    {t.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t.note || 'No note'} · {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className={`text-base font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
              </p>
              <button onClick={() => handleDelete(t._id)}
                className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;