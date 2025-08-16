const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

async function migrate() {
  // 删除旧表（如果存在）
  await pool.query('DROP TABLE IF EXISTS tasks');
  
  // 创建新的扩展任务表
  const createTable = `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed', 'overdue') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    category VARCHAR(100) DEFAULT '开发任务',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    due_date DATE NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;
  
  await pool.query(createTable);
  
  // 插入示例数据
  const sampleTasks = [
    {
      title: '完成项目文档',
      description: '编写项目技术文档和用户手册',
      status: 'completed',
      priority: 'high',
      category: '文档任务',
      completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2天前完成
    },
    {
      title: '代码审查',
      description: '审查团队成员的代码提交',
      status: 'pending',
      priority: 'medium',
      category: '开发任务',
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3天后到期
    },
    {
      title: '团队会议',
      description: '每周团队进度同步会议',
      status: 'pending',
      priority: 'low',
      category: '管理任务',
      due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1天后到期
    },
    {
      title: '系统测试',
      description: '执行完整的系统集成测试',
      status: 'overdue',
      priority: 'high',
      category: '测试任务',
      due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1天前到期
    },
    {
      title: 'UI设计优化',
      description: '优化用户界面的视觉效果',
      status: 'completed',
      priority: 'medium',
      category: '设计任务',
      completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5天前完成
    },
    {
      title: '数据库优化',
      description: '优化数据库查询性能',
      status: 'pending',
      priority: 'high',
      category: '开发任务',
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2天后到期
    },
    {
      title: 'API文档更新',
      description: '更新API接口文档',
      status: 'completed',
      priority: 'low',
      category: '文档任务',
      completed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3天前完成
    },
    {
      title: '性能测试',
      description: '执行系统性能压力测试',
      status: 'pending',
      priority: 'medium',
      category: '测试任务',
      due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4天后到期
    }
  ];
  
  for (const task of sampleTasks) {
    await pool.query(
      'INSERT INTO tasks (title, description, status, priority, category, completed_at, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [task.title, task.description, task.status, task.priority, task.category, task.completed_at, task.due_date]
    );
  }
  
  console.log('数据库迁移和示例数据插入完成');
  process.exit(0);
}

if (process.argv.includes('--migrate')) {
  migrate();
}

module.exports = pool;
