import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MonthlyBarChart = ({ expenses }) => {
  if (!expenses?.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        Add some expenses to see monthly trends.
      </div>
    );
  }

  const monthKey = (date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    return `${y}-${m.toString().padStart(2, '0')}`;
  };

  const map = new Map();
  expenses.forEach((e) => {
    const key = monthKey(e.date);
    map.set(key, (map.get(key) || 0) + (e.amount || 0));
  });

  const data = Array.from(map.entries())
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => (a.month > b.month ? 1 : -1));

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-sm font-medium text-slate-100 mb-3">Monthly Expenses</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: 12 }}
          />
          <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;

