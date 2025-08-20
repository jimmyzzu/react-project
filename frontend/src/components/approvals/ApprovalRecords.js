import React from 'react';

function ApprovalRecords({ records, onUpdateStatus, nextStatusLabel }) {
  return (
    <div className="space-y-3">
      {records.map(r => (
        <div key={r.id} className="p-3 bg-gray-50 rounded flex items-center justify-between">
          <div>
            <div className="font-medium">状态：{r.status}</div>
            <div className="text-sm text-gray-600">审批人：{r.reviewer || '—'} · 意见：{r.comment || '—'}</div>
          </div>
          <button onClick={() => onUpdateStatus?.(r.id)} className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">更新为 {nextStatusLabel}</button>
        </div>
      ))}
      {(records?.length || 0) === 0 && <div className="text-gray-500">暂无审批记录</div>}
    </div>
  );
}

export default ApprovalRecords;


