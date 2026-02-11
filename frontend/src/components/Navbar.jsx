import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
            ET
          </span>
          <span className="font-semibold text-slate-50">Expense Tracker</span>
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/expenses/new')}
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              + Add Expense
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-slate-700"
              />
              <span className="text-sm text-slate-100">{user.name}</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-slate-300 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

