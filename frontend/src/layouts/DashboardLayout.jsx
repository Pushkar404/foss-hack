import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-60 bg-slate-900 border-r border-slate-800 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses/new"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Add Expense
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Profile
          </NavLink>
        </aside>
        <main className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

