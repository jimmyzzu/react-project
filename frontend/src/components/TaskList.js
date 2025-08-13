import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  console.log('TaskList 渲染，任务数量:', tasks.length, '任务列表:', tasks);

  const handleEdit = (task) => {
    console.log('TaskList: 点击编辑按钮，任务:', task);
    onEdit(task);
  };

  const handleDelete = (taskId) => {
    console.log('TaskList: 点击删除按钮，任务ID:', taskId);
    if (window.confirm('确定要删除这个任务吗？')) {
      onDelete(taskId);
    } else {
      console.log('TaskList: 用户取消删除操作');
    }
  };

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
                <button 
                  className="text-blue-600" 
                  onClick={() => handleEdit(task)}
                >
                  编辑
                </button>
                <button 
                  className="text-red-600" 
                  onClick={() => handleDelete(task.id)}
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
