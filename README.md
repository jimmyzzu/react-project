# 全栈任务管理应用

- 前端：React + Tailwind CSS
- 后端：Node.js + Express + MySQL

## 功能
- 用户可以创建、编辑、删除任务
- 任务包含标题、描述、状态
- 后端提供 REST API，前端调用

## 启动方式

### 1. 启动 MySQL 并创建数据库
```sql
CREATE DATABASE taskdb;
```

### 2. 启动后端
```bash
cd backend
cp .env.example .env # 配置数据库连接
npm install
npm run migrate # 初始化表和示例数据
npm start
```
简要说明：后端数据库参数在 `react-project/backend/.env` 中配置；`src/db.js` 会读取这些变量连接 MySQL。 后端 migrate 命令会自动插入两条示例任务数据到数据库。你只需配置好 MySQL 数据库（如 taskdb），并在 .env 文件中填写正确的数据库连接信息即可。前端和后端端口分别为 3000 和 5000，API 地址已在 axios 实例中统一配置。


### 3. 配置步骤
1. 使用数据库
    test_database
2. 复制并编辑环境变量
   `.env` 示例（本地 MySQL）：
   ```env
   DB_HOST=192.168.54.135
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=test_database
   DB_PORT=3306
   PORT=5000 # 后端启动端口号
   ```
3. 初始化数据并启动
   ```bash
   npm install
   npm run migrate   # 建表并插入示例数据
   npm start
   ```
### 3. 启动前端
```bash
cd frontend
npm install
npm start
```

前端默认端口：3000，后端默认端口：5000。

---

## REST API 简介
- `GET    /api/tasks`         获取所有任务
- `POST   /api/tasks`         创建任务
- `PUT    /api/tasks/:id`     更新任务
- `DELETE /api/tasks/:id`     删除任务
