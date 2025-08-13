import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
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
  };

  const handleCancelEdit = () => {
    console.log('取消编辑任务');
    setEditing(null);
  };

  console.log('App 组件渲染，当前状态:', { tasksCount: tasks.length, editing: editing?.id });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">任务管理</h1>
      <TaskForm 
        onSubmit={editing ? (task) => handleUpdate(editing.id, task) : handleCreate} 
        editing={editing} 
        onCancel={handleCancelEdit} 
      />
      <TaskList 
        tasks={tasks} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;
