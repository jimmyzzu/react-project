import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import api from './utils/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    await api.post('/tasks', task);
    fetchTasks();
  };

  const handleUpdate = async (id, task) => {
    await api.put(`/tasks/${id}`, task);
    setEditing(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">任务管理</h1>
      <TaskForm onSubmit={editing ? (task) => handleUpdate(editing.id, task) : 
        handleCreate} editing={editing} onCancel={() => setEditing(null)} />
      <TaskList tasks={tasks} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}

export default App;
