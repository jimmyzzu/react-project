# React + Tailwind 任务管理前端

## 启动方式
```bash
npm install
npm start
```

## 主要页面
- 首页：任务列表、创建、编辑、删除

## 依赖
- React
- Tailwind CSS
- Axios

## 日志功能
项目已添加完整的日志记录：
- 组件渲染和状态变化日志
- API 请求和响应日志
- 用户操作日志（创建、编辑、删除任务）
- 错误处理和异常日志

查看日志：打开浏览器开发者工具（F12）→ Console 面板

## 测试
```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 测试覆盖
- TaskForm 组件：表单渲染、数据填充、提交验证
- TaskList 组件：列表渲染、编辑删除操作
- API 工具：axios 实例配置和拦截器

### 测试文件
- `src/components/__tests__/TaskForm.test.js`
- `src/components/__tests__/TaskList.test.js`
- `src/utils/__tests__/api.test.js`
