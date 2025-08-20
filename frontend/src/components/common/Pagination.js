import React from 'react';

function Pagination({ pageNo, pageSize = 5, total = 0, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (n) => {
    if (n < 1 || n > pages) return;
    onChange && onChange(n);
  };
  const nums = [];
  for (let i = 1; i <= pages; i++) nums.push(i);
  return (
    <div className="flex items-center gap-2 text-sm">
      <button onClick={() => go(pageNo - 1)} className="px-2 py-1 border rounded disabled:opacity-50" disabled={pageNo <= 1}>上一页</button>
      {nums.map(n => (
        <button key={n} onClick={() => go(n)} className={`px-2 py-1 border rounded ${n === pageNo ? 'bg-blue-600 text-white border-blue-600' : ''}`}>{n}</button>
      ))}
      <button onClick={() => go(pageNo + 1)} className="px-2 py-1 border rounded disabled:opacity-50" disabled={pageNo >= pages}>下一页</button>
      <span className="text-gray-500">共 {total} 条</span>
    </div>
  );
}

export default Pagination;
