import React from 'react';

function Toolbar({ title = '任务管理', onAdd, onSearchChange, onStatusChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-card p-4 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      <div className="flex items-center gap-3">
        <input
          className="w-64 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="搜索任务..."
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <select
          className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          onChange={(e) => onStatusChange?.(e.target.value)}
          defaultValue="all"
        >
          <option value="all">全部</option>
          <option value="pending">待办</option>
          <option value="completed">已完成</option>
        </select>
        <button
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md shadow-sm"
          onClick={() => onAdd?.()}
        >
          新建任务
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
