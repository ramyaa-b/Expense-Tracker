const Budget = require('../models/Budget');

const getBudgets = async (req, res) => {
  try {
    const { month } = req.query;
    const query = { userId: req.user.id };
    if (month) query.month = month;

    const budgets = await Budget.find(query);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const setBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId: req.user.id, category, month },
      { limit },
      { upsert: true, new: true }
    );

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBudgets, setBudget };