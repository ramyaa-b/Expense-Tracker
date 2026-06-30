const Transaction = require('../models/Transaction');

const getSummary = async (req, res) => {
  try {
    const { month } = req.query;
    let query = { userId: req.user.id };

    if (month) {
      const [year, mon] = month.split('-');
      const start = new Date(year, mon - 1, 1);
      const end = new Date(year, mon, 1);
      query.date = { $gte: start, $lt: end };
    }

    const transactions = await Transaction.find(query);

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const byCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const byCategoryArray = Object.entries(byCategory).map(([name, value]) => ({
      name,
      value
    }));

    // Monthly breakdown for bar chart
    const monthlyMap = {};
    transactions.forEach(t => {
      const key = t.date.toISOString().slice(0, 7);
      if (!monthlyMap[key]) monthlyMap[key] = { month: key, income: 0, expense: 0 };
      monthlyMap[key][t.type] += t.amount;
    });

    const monthly = Object.values(monthlyMap).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    res.json({
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      byCategory: byCategoryArray,
      monthly
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getSummary };