import React from 'react';

function TaskQueueList({ tasks, selectedTaskId, onSelect }) {
  return (
    <div className="space-y-2 max-h-64 overflow-auto">
      {tasks.map(t => (
        <div key={t.id} className={`p-3 border rounded flex items-center justify-between ${Number(selectedTaskId) === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
          <div>
            <div className="font-medium text-gray-800">{t.title}</div>
            <div className="text-xs text-gray-500">状态：{t.reviewStatus} · 创建者：{t.owner || '—'}</div>
          </div>
          <button
            onClick={() => onSelect && onSelect(t)}
            className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >选择</button>
        </div>
      ))}
      {(tasks?.length || 0) === 0 && <div className="text-gray-500">暂无待审核任务</div>}
    </div>
  );
}

export default TaskQueueList;


