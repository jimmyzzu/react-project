import React from 'react';

function StatCard({ title, value, color = 'indigo' }) {
  const bg = `bg-${color}-50`;
  const text = `text-${color}-600`;
  return (
    <div className={`rounded-lg p-5 text-center ${bg}`}>
      <div className={`text-3xl font-bold ${text}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  );
}

export default StatCard;


