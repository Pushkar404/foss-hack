import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ initialData, onSubmit, categories, submitting }) => {
  const [amount, setAmount] = useState(initialData?.amount ?? '');
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(
    initialData?.date ? initialData.date.substring(0, 10) : new Date().toISOString().substring(0, 10)
  );
  const [description, setDescription] = useState(initialData?.description ?? '');

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount ?? '');
      setCategory(initialData.category ?? '');
      setDate(initialData.date ? initialData.date.substring(0, 10) : '');
      setDescription(initialData.description ?? '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = customCategory.trim() || category;
    if (!finalCategory) return;
    const payload = {
      amount: Number(amount),
      category: finalCategory,
      date,
      description
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="space-y-1">
        <label className="block text-sm text-slate-200">Amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm text-slate-200">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full"
        >
          <option value="">Select a category</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-400 mt-1">Or create a custom category:</p>
        <input
          type="text"
          placeholder="Custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm text-slate-200">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm text-slate-200">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional note"
          className="w-full"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-sm font-semibold text-white"
      >
        {submitting ? 'Saving...' : 'Save Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;

