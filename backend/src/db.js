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
  const createTable = `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(32) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  await pool.query(createTable);
  // 插入示例数据
  await pool.query("INSERT INTO tasks (title, description, status) VALUES ('示例任务1', '这是第一个任务', 'pending'), ('示例任务2', '这是第二个任务', 'completed')");
  console.log('数据库迁移和示例数据插入完成');
  process.exit(0);
}

if (process.argv.includes('--migrate')) {
  migrate();
}

module.exports = pool;
