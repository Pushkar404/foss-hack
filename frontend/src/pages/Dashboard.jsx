import React, { useEffect, useMemo, useState, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ExpenseFilters from '../components/ExpenseFilters';
import ExpenseList from '../components/ExpenseList';
import StatsSummary from '../components/StatsSummary';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    search: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.search) params.search = filters.search;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      const res = await api.get('/expenses', { params });
      setExpenses(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      // Optionally show inline error
    }
  };

  const filteredExpenses = useMemo(() => expenses, [expenses]);

  const recentExpenses = useMemo(
    () => filteredExpenses.slice(0, 5),
    [filteredExpenses]
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Dashboard</h1>
          <p className="text-xs text-slate-400">Overview of your financial health.</p>
        </div>
        {user && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>Logged in as</span>
            <span className="font-medium text-slate-100">{user.email}</span>
          </div>
        )}
      </div>

      {/* Top stats cards */}
      <StatsSummary expenses={filteredExpenses} />

      {/* Main content: overview chart + recent expenses list */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.3fr] gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-slate-100">Overview</p>
              <p className="text-xs text-slate-400">Spending by month</p>
            </div>
          </div>
          <MonthlyBarChart expenses={filteredExpenses} />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-slate-100">Recent Expenses</p>
              <p className="text-xs text-slate-400">Your latest transactions</p>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
            </div>
          ) : recentExpenses.length === 0 ? (
            <p className="text-xs text-slate-400">No expenses yet. Add your first one!</p>
          ) : (
            <ul className="flex-1 space-y-2 text-xs text-slate-200">
              {recentExpenses.map((exp) => (
                <li
                  key={exp._id}
                  className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-100">
                      {exp.description || exp.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(exp.date).toLocaleDateString()} · {exp.category}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-50">
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: 'USD'
                    }).format(exp.amount || 0)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() =>
              document.getElementById('all-expenses')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-4 self-start text-xs font-medium text-indigo-400 hover:text-indigo-300"
          >
            View All Expenses
          </button>
        </div>
      </div>

      {/* Filters + full expenses table */}
      <div
        id="all-expenses"
        className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-100">All Expenses</p>
        </div>

        <ExpenseFilters categories={user?.categories || []} onChange={setFilters} />

        {error && (
          <div className="mb-2 text-sm text-red-400 border border-red-500/60 bg-red-950/30 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
        )}
      </div>

      {/* Optional extra analytics card for category distribution */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm font-medium text-slate-100 mb-3">By Category</p>
        <CategoryPieChart expenses={filteredExpenses} />
      </div>
    </div>
  );
};

export default Dashboard;

