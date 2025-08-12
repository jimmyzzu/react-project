const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 获取所有任务
app.get('/api/tasks', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(rows);
});

// 创建任务
app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  const [result] = await pool.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status || 'pending']);
  res.json({ id: result.insertId, title, description, status: status || 'pending' });
});

// 更新任务
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  await pool.query('UPDATE tasks SET title=?, description=?, status=? WHERE id=?', [title, description, status, id]);
  res.json({ id, title, description, status });
});

// 删除任务
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id=?', [id]);
  res.json({ success: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
