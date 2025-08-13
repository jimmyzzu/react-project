import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Toolbar from './components/Toolbar';
import api from './utils/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    console.log('开始获取任务列表...');
    try {
      const res = await api.get('/tasks');
      console.log('获取任务列表成功:', res.data);
      setTasks(res.data);
    } catch (error) {
      console.error('获取任务列表失败:', error);
    }
  };

  useEffect(() => {
    console.log('App 组件挂载，初始化任务列表');
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    console.log('创建新任务:', task);
    try {
      await api.post('/tasks', task);
      console.log('任务创建成功');
      fetchTasks();
    } catch (error) {
      console.error('任务创建失败:', error);
    }
  };

  const handleUpdate = async (id, task) => {
    console.log('更新任务:', { id, task });
    try {
      await api.put(`/tasks/${id}`, task);
      console.log('任务更新成功');
      setEditing(null);
      fetchTasks();
    } catch (error) {
      console.error('任务更新失败:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('删除任务:', id);
    try {
      await api.delete(`/tasks/${id}`);
      console.log('任务删除成功');
      fetchTasks();
    } catch (error) {
      console.error('任务删除失败:', error);
    }
  };

  const handleEdit = (task) => {
    console.log('开始编辑任务:', task);
    setEditing(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    console.log('取消编辑任务');
    setEditing(null);
  };

  console.log('App 组件渲染，当前状态:', { tasksCount: tasks.length, editing: editing?.id });

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <Toolbar onAdd={() => setEditing({ title: '', description: '', status: 'pending' })} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-semibold text-text mb-4">{editing ? '编辑任务' : '创建任务'}</h2>
            <TaskForm 
              onSubmit={editing ? (task) => handleUpdate(editing.id, task) : handleCreate} 
              editing={editing} 
              onCancel={handleCancelEdit} 
            />
          </div>

          <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-semibold text-text mb-4">任务列表</h2>
            <TaskList 
              tasks={tasks} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
