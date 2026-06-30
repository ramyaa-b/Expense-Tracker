const BudgetCard = ({ category, limit, spent }) => {
  const percent = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;
  const isOver = spent > limit;

  const barColor = percent >= 100 ? 'bg-red-500' : percent >= 75 ? 'bg-amber-400' : 'bg-blue-500';
  const statusColor = isOver ? 'text-red-500' : percent >= 75 ? 'text-amber-500' : 'text-emerald-600';
  const statusBg = isOver ? 'bg-red-50' : percent >= 75 ? 'bg-amber-50' : 'bg-emerald-50';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">{category}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly budget</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusBg} ${statusColor}`}>
          {isOver ? 'Over budget' : `${(100 - percent).toFixed(0)}% left`}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
        <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${percent}%` }} />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">Spent</p>
          <p className="text-sm font-bold text-slate-800">₹{spent.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">{isOver ? 'Over by' : 'Remaining'}</p>
          <p className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-emerald-600'}`}>
            ₹{Math.abs(remaining).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Limit</p>
          <p className="text-sm font-bold text-slate-800">₹{limit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;