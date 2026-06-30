const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

const chat = async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(20);
    const budgets = await Budget.find({ userId });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const byCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const systemPrompt = `You are a personal AI financial advisor inside a finance tracking app called FinTrack.
You have access to the user's real financial data:

FINANCIAL SUMMARY:
- Total Income: ₹${totalIncome.toLocaleString()}
- Total Expenses: ₹${totalExpenses.toLocaleString()}
- Net Balance: ₹${(totalIncome - totalExpenses).toLocaleString()}
- Spending by category: ${JSON.stringify(byCategory)}

RECENT TRANSACTIONS (last 20):
${transactions.map(t => `${t.type}: ₹${t.amount} on ${t.category} (${t.note || 'no note'}) - ${new Date(t.date).toLocaleDateString()}`).join('\n') || 'No transactions yet'}

BUDGETS:
${budgets.map(b => `${b.category}: ₹${b.limit} limit for ${b.month}`).join('\n') || 'No budgets set'}

Instructions:
- Give specific, personalized advice based on THEIR actual data
- Be conversational, friendly but professional
- Use ₹ for currency
- Keep responses concise (2-4 sentences max unless they ask for detail)
- Reference their real numbers when answering
- Give actionable tips
- If data is empty, encourage them to add transactions first`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq error:', data);
      return res.status(500).json({ message: 'AI error', error: data });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Chat failed', error: error.message });
  }
};

module.exports = { chat };