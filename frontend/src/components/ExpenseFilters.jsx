import React, { useState, useEffect } from 'react';

const ExpenseFilters = ({ categories, onChange }) => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    onChange({ category, search, startDate, endDate });
  }, [category, search, startDate, endDate, onChange]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
      <div className="space-y-1">
        <label className="text-xs text-slate-300">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          {categories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-slate-300">Search</label>
        <input
          type="text"
          placeholder="Description contains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-slate-300">From</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-slate-300">To</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
    </div>
  );
};

export default ExpenseFilters;

