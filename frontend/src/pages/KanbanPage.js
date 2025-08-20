import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PageHeader from '../components/common/PageHeader';

const columns = [
  { key: 'pending', title: '待处理' },
  { key: 'in_progress', title: '进行中' },
  { key: 'completed', title: '已完成' },
];

function KanbanPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data || []);
    } catch (e) {
      console.error('加载任务失败', e);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const grouped = columns.reduce((acc, c) => {
    acc[c.key] = tasks.filter(t => (t.status || 'pending') === c.key);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <PageHeader title="看板视图" right={<button onClick={fetchTasks} className="px-3 py-2 rounded bg-white shadow hover:bg-gray-50">刷新</button>} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(col => (
            <div key={col.key} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">{col.title}</h2>
                <span className="text-sm text-gray-500">{grouped[col.key]?.length || 0}</span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {(grouped[col.key] || []).map(task => (
                  <div key={task.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="font-medium text-gray-800 truncate">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{task.description}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>
                      <span className="text-xs text-gray-500">{task.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KanbanPage;


