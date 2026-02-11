import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';

const ExpenseFormPage = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(mode === 'edit');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchExpense = async () => {
        try {
          const res = await api.get('/expenses');
          const expense = res.data.find((e) => e._id === id);
          if (!expense) {
            setError('Expense not found');
          } else {
            setInitialData(expense);
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load expense');
        } finally {
          setLoading(false);
        }
      };
      fetchExpense();
    }
  }, [id, mode]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');
    try {
      if (mode === 'edit' && id) {
        await api.put(`/expenses/${id}`, payload);
      } else {
        await api.post('/expenses', payload);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = useMemo(() => user?.categories || [], [user]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-50">
          {mode === 'edit' ? 'Edit Expense' : 'Add Expense'}
        </h1>
        <p className="text-xs text-slate-400">
          {mode === 'edit'
            ? 'Update the details of your expense.'
            : 'Record a new expense in your history.'}
        </p>
      </div>

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
        <ExpenseForm
          initialData={initialData}
          onSubmit={handleSubmit}
          categories={categories}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default ExpenseFormPage;

