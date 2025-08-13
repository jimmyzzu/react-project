import React, { useEffect, useState } from 'react';

const initialState = { title: '', description: '', status: 'pending' };

function TaskForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    console.log('TaskForm useEffect 触发，editing:', editing);
    if (editing) {
      console.log('设置编辑模式，表单数据:', editing);
      setForm(editing);
    } else {
      console.log('设置创建模式，重置表单');
      setForm(initialState);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('表单字段变化:', { name, value });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('表单提交，数据:', form);
    if (!form.title) {
      console.warn('表单验证失败：标题不能为空');
      return;
    }
    onSubmit(form);
    console.log('表单提交完成，重置表单');
    setForm(initialState);
  };

  const handleCancel = () => {
    console.log('取消编辑操作');
    onCancel();
  };

  console.log('TaskForm 渲染，当前表单状态:', form);

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
          <button className="bg-gray-400 text-white px-4 py-1 rounded" type="button" onClick={handleCancel}>
            取消
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
