const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

// 进程级异常兜底，防止进程直接退出
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 通用异步错误捕获包装器
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 公共方法：校验并解析正整数 id，非法时返回响应并返回 null 以便上层 return 提前结束
function ensureValidIdOrRespond(id, res) {
  if (id === undefined || id === null || String(id).trim() === '') {
    res.status(400).json({ message: 'id 不能为空' });
    return null;
  }
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    res.status(400).json({ message: 'id 非法' });
    return null;
  }
  return numericId;
}

// 获取所有任务
app.get('/api/tasks', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(rows);
}));

// 创建任务
app.post('/api/tasks', asyncHandler(async (req, res) => {
  const { title, description, status } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: 'title 为必填项' });
  }
  const safeStatus = status || 'pending';
  const [result] = await pool.query(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [title, description || '', safeStatus]
  );
  res.json({ id: result.insertId, title, description: description || '', status: safeStatus });
}));

// 更新任务
app.put('/api/tasks/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const numericId = ensureValidIdOrRespond(id, res);
  if (numericId == null) return; // 已返回 400 响应

  const { title, description, status } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: 'title 为必填项' });
  }
  const [result] = await pool.query(
    'UPDATE tasks SET title=?, description=?, status=? WHERE id=?',
    [title, description || '', status || 'pending', numericId]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: '任务不存在' });
  }
  res.json({ id: numericId, title, description: description || '', status: status || 'pending' });
}));

// 删除任务
app.delete('/api/tasks/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const numericId = ensureValidIdOrRespond(id, res);
  if (numericId == null) return; // 已返回 400 响应

  const [result] = await pool.query('DELETE FROM tasks WHERE id=?', [numericId]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: '任务不存在' });
  }
  res.json({ success: true });
}));

// 集中式错误处理中间件（应放在路由之后）
app.use((err, req, res, next) => {
  console.error('请求处理出错:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: '服务器内部错误', error: process.env.NODE_ENV === 'development' ? String(err?.message || err) : undefined });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
