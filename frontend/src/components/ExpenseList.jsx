import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);

const formatDate = (value) => new Date(value).toLocaleDateString();

const ExpenseList = ({ expenses, onDelete }) => {
  const navigate = useNavigate();

  if (!expenses?.length) {
    return (
      <div className="border border-dashed border-slate-700 rounded-lg p-6 text-center text-sm text-slate-300">
        You don&apos;t have any expenses yet. Start tracking by adding your first one.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-slate-300">Date</th>
            <th className="px-4 py-2 text-left font-medium text-slate-300">Category</th>
            <th className="px-4 py-2 text-left font-medium text-slate-300">Description</th>
            <th className="px-4 py-2 text-right font-medium text-slate-300">Amount</th>
            <th className="px-4 py-2 text-right font-medium text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950/60">
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="px-4 py-2 text-slate-200">{formatDate(expense.date)}</td>
              <td className="px-4 py-2 text-slate-200">{expense.category}</td>
              <td className="px-4 py-2 text-slate-400">{expense.description || '—'}</td>
              <td className="px-4 py-2 text-right text-slate-100">
                {formatCurrency(expense.amount)}
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => navigate(`/expenses/${expense._id}/edit`)}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(expense._id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;

