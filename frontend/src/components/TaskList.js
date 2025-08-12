import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <div className="text-gray-500">暂无任务</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-white shadow p-3 mb-2 rounded">
              <div>
                <div className="font-semibold">{task.title}</div>
                <div className="text-sm text-gray-500">{task.description}</div>
                <div className="text-xs text-blue-500">状态：{task.status}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600" onClick={() => onEdit(task)}>编辑</button>
                <button className="text-red-600" onClick={() => onDelete(task.id)}>删除</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
