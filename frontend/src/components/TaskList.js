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

  const StatusChip = ({ status }) => (
    <span className={`text-xs px-2 py-1 rounded-sm border ${
      status === 'completed' 
        ? 'bg-green-50 text-green-700 border-green-200' 
        : 'bg-slate-100 text-slate-700 border-slate-200'
    }`}>
      {status === 'completed' ? '已完成' : '待办'}
    </span>
  );

  return (
    <div className="mt-2">
      {tasks.length === 0 ? (
        <div className="text-subtext text-sm">暂无任务</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="bg-card rounded-md shadow-md p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <div className="font-semibold text-text text-base">{task.title}</div>
                  <div className="text-sm text-subtext mt-1">{task.description}</div>
                </div>
                <StatusChip status={task.status} />
              </div>
              <div className="flex gap-3 mt-3">
                <button 
                  className="text-primary hover:text-primary-hover"
                  onClick={() => handleEdit(task)}
                >
                  编辑
                </button>
                <button 
                  className="text-danger hover:opacity-90"
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
