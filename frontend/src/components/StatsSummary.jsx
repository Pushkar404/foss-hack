import React, { useEffect, useMemo, useState } from 'react';

const sumAmounts = (expenses) => expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

// Hook to animate a number from 0 to target in a given duration.
// Uses requestAnimationFrame for smooth, GPU-friendly updates.
const useAnimatedNumber = (target, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const next = target * progress;
      setValue(next);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return value;
};

const StatsSummary = ({ expenses }) => {
  const { total, monthTotal, count } = useMemo(() => {
    if (!expenses?.length) {
      return { total: 0, monthTotal: 0, count: 0 };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalAmount = 0;
    let monthAmount = 0;

    expenses.forEach((e) => {
      const d = new Date(e.date);
      totalAmount += e.amount || 0;
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        monthAmount += e.amount || 0;
      }
    });

    return { total: totalAmount, monthTotal: monthAmount, count: expenses.length };
  }, [expenses]);

  const animatedTotal = useAnimatedNumber(total, 1000);
  const animatedMonthTotal = useAnimatedNumber(monthTotal, 1000);
  const animatedCount = useAnimatedNumber(count, 1000);

  const formatCurrency = (value) =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs text-slate-400">Total Expenses</p>
        <p className="mt-1 text-xl font-semibold text-slate-50">
          {formatCurrency(animatedTotal)}
        </p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs text-slate-400">Current Month</p>
        <p className="mt-1 text-xl font-semibold text-slate-50">
          {formatCurrency(animatedMonthTotal)}
        </p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs text-slate-400">Number of Transactions</p>
        <p className="mt-1 text-xl font-semibold text-slate-50">
          {Math.round(animatedCount)}
        </p>
      </div>
    </div>
  );
};

export default StatsSummary;

