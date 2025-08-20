import React, { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';
import PageHeader from '../components/common/PageHeader';

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [current, setCurrent] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() }; // month: 0-11
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data || []);
      } catch (e) {
        console.error('加载任务失败', e);
      }
    };
    fetchTasks();
  }, []);

  const days = useMemo(() => {
    const firstDay = new Date(current.year, current.month, 1);
    const startWeekday = firstDay.getDay(); // 0 Sun - 6 Sat
    const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [current]);

  const tasksByDate = useMemo(() => {
    const map = new Map();
    tasks.forEach(t => {
      if (!t.due_date) return;
      const key = String(t.due_date).slice(0, 10);
      const arr = map.get(key) || [];
      arr.push(t);
      map.set(key, arr);
    });
    return map;
  }, [tasks]);

  const monthLabel = `${current.year}年${current.month + 1}月`;

  const moveMonth = (delta) => {
    const m = current.month + delta;
    const y = current.year + Math.floor(m / 12);
    const newMonth = ((m % 12) + 12) % 12;
    setCurrent({ year: y, month: newMonth });
  };

  const dateKey = (d) => {
    if (!d) return '';
    const mm = String(current.month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${current.year}-${mm}-${dd}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <PageHeader title={`日历视图 · ${monthLabel}`} right={
          <div className="space-x-2">
            <button onClick={() => moveMonth(-1)} className="px-3 py-2 rounded bg-white shadow hover:bg-gray-50">上一月</button>
            <button onClick={() => moveMonth(1)} className="px-3 py-2 rounded bg-white shadow hover:bg-gray-50">下一月</button>
          </div>
        } />

        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 mb-2">
          {['日','一','二','三','四','五','六'].map(w => (
            <div key={w} className="py-2 font-medium">{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((d, idx) => {
            const key = dateKey(d);
            const dayTasks = key ? (tasksByDate.get(key) || []) : [];
            return (
              <div key={idx} className={`min-h-[96px] bg-white rounded-lg shadow p-2 text-left ${d ? '' : 'opacity-40'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{d || ''}</span>
                  {dayTasks.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{dayTasks.length}</span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {dayTasks.slice(0, 3).map(t => (
                    <div key={t.id} className="truncate text-xs">
                      <span className={`inline-block w-2 h-2 mr-1 rounded-full ${t.status === 'completed' ? 'bg-green-500' : t.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                      {t.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500">+{dayTasks.length - 3} 更多</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;


