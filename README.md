# React 任务管理系统

这是一个完整的全栈任务管理系统，包含React前端和Node.js后端，使用MySQL数据库存储数据。

## 项目结构

```
react-project/
├── backend/          # Node.js + Express 后端
├── frontend/         # React 前端
└── README.md
```

## 环境要求

- Node.js 16+
- MySQL 8.0+
- npm 或 yarn

## 快速开始

### 1. 环境配置

在 `backend/` 目录下创建 `.env` 文件：

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=task_management
DB_PORT=3306
PORT=5000
```

### 2. 安装依赖

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

### 3. 数据库设置

```bash
# 在MySQL中创建数据库
mysql -u root -p
CREATE DATABASE task_management;
USE task_management;

# 运行数据库迁移（创建表和示例数据）
cd backend
npm run migrate
```

### 4. 启动应用

```bash
# 启动后端服务器（端口5000）
cd backend
npm start

# 新开终端，启动前端开发服务器（端口3000）
cd frontend
npm start
```

## 功能特性

### 前端 (React)
- **任务管理**: 创建、编辑、删除任务
- **数据统计**: 实时显示任务完成情况
- **数据分析**: 任务分类分布和每周进度
- **响应式设计**: 支持移动端和桌面端

### 后端 (Node.js + Express)
- **RESTful API**: 完整的CRUD操作
- **数据统计**: 任务统计、分类分布、进度分析
- **数据库集成**: MySQL数据库支持
- **错误处理**: 完善的错误处理和日志记录

### 数据库设计
- **tasks表**: 包含任务标题、描述、状态、优先级、分类等字段
- **状态管理**: pending（待处理）、completed（已完成）、overdue（已逾期）
- **优先级**: low（低）、medium（中）、high（高）
- **分类**: 开发任务、设计任务、测试任务、文档任务、管理任务

## API 端点

### 任务管理
- `GET /api/tasks` - 获取所有任务
- `POST /api/tasks` - 创建新任务
- `PUT /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务

### 数据统计
- `GET /api/tasks/stats` - 获取任务统计
- `GET /api/tasks/recent` - 获取最近任务
- `GET /api/tasks/categories` - 获取分类分布
- `GET /api/tasks/weekly-progress` - 获取每周进度

## 开发说明

### 数据库迁移
当需要修改数据库结构时，可以运行：
```bash
cd backend
npm run migrate
```

### 前端开发
前端使用React Hooks管理状态，包括：
- `useState`: 管理组件状态
- `useEffect`: 处理副作用和数据获取
- 自定义API调用函数

### 后端开发
后端使用Express框架，包含：
- 中间件配置（CORS、body-parser）
- 异步错误处理
- 数据库连接池管理

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL服务是否运行
   - 验证.env文件中的数据库配置
   - 确保数据库用户有足够权限

2. **前端无法获取数据**
   - 检查后端服务器是否运行在5000端口
   - 查看浏览器控制台的错误信息
   - 确认CORS配置正确

3. **端口冲突**
   - 修改.env文件中的PORT配置
   - 同时更新前端API配置中的端口号

## 技术栈

- **前端**: React 18, Tailwind CSS, Axios
- **后端**: Node.js, Express, MySQL2
- **数据库**: MySQL
- **开发工具**: npm, Create React App

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License
