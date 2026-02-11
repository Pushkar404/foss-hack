import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ec4899', '#a855f7'];

const CategoryPieChart = ({ expenses }) => {
  if (!expenses?.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        Add some expenses to see category distribution.
      </div>
    );
  }

  const map = new Map();
  expenses.forEach((e) => {
    const key = e.category || 'Uncategorized';
    map.set(key, (map.get(key) || 0) + (e.amount || 0));
  });

  const data = Array.from(map.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-sm font-medium text-slate-100 mb-3">By Category</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#020617',
              borderColor: '#1e293b',
              fontSize: 12
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;

