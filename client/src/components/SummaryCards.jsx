const SummaryCards = ({ totalIncome, totalExpenses, netBalance }) => {
  const cards = [
    {
      label: 'Total Income',
      value: totalIncome,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      prefix: '+'
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-100',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
          <polyline points="17 18 23 18 23 12"/>
        </svg>
      ),
      prefix: '-'
    },
    {
      label: 'Net Balance',
      value: netBalance,
      color: netBalance >= 0 ? 'text-blue-600' : 'text-red-500',
      bg: netBalance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      border: netBalance >= 0 ? 'border-blue-100' : 'border-red-100',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      prefix: netBalance >= 0 ? '+' : ''
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {cards.map((card) => (
        <div key={card.label} className={`bg-white rounded-2xl border ${card.border} p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">{card.label}</span>
            <div className={`${card.bg} ${card.color} p-2 rounded-lg`}>
              {card.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold ${card.color}`}>
            ₹{Math.abs(card.value).toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {card.prefix}₹{Math.abs(card.value).toLocaleString()} this period
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;