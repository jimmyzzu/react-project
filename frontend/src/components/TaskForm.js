import React, { useEffect, useState } from 'react';

const initialState = { title: '', description: '', status: 'pending' };

function TaskForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm(initialState);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form className="flex flex-col gap-2 bg-gray-50 p-4 rounded shadow" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded"
        name="title"
        placeholder="任务标题"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="border p-2 rounded"
        name="description"
        placeholder="任务描述"
        value={form.description}
        onChange={handleChange}
      />
      <select
        className="border p-2 rounded"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="pending">待办</option>
        <option value="completed">已完成</option>
      </select>
      <div className="flex gap-2 mt-2">
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">
          {editing ? '保存' : '创建'}
        </button>
        {editing && (
          <button className="bg-gray-400 text-white px-4 py-1 rounded" type="button" onClick={onCancel}>
            取消
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
