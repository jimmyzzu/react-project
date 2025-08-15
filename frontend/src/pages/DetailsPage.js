import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DetailsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');

  const handleBack = () => {
    navigate('/');
  };

  const handleGoToMain = () => {
    navigate('/main');
  };

  // 模拟数据
  const taskStats = {
    total: 24,
    completed: 18,
    pending: 4,
    overdue: 2
  };

  const recentTasks = [
    { id: 1, title: '完成项目文档', status: 'completed', priority: 'high' },
    { id: 2, title: '代码审查', status: 'pending', priority: 'medium' },
    { id: 3, title: '团队会议', status: 'pending', priority: 'low' },
    { id: 4, title: '系统测试', status: 'overdue', priority: 'high' }
  ];

  const analyticsData = {
    weeklyProgress: [65, 78, 82, 75, 90, 85, 88],
    categoryDistribution: [
      { name: '开发任务', value: 45, color: 'bg-blue-500' },
      { name: '设计任务', value: 25, color: 'bg-green-500' },
      { name: '测试任务', value: 20, color: 'bg-yellow-500' },
      { name: '文档任务', value: 10, color: 'bg-purple-500' }
    ]
  };

  const renderTaskManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
          <div className="text-sm text-gray-600">总任务</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
          <div className="text-sm text-gray-600">已完成</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{taskStats.pending}</div>
          <div className="text-sm text-gray-600">待处理</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
          <div className="text-sm text-gray-600">已逾期</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">最近任务</h3>
        <div className="space-y-3">
          {recentTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-green-500' :
                  task.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium">{task.title}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              <span className={`text-sm ${
                task.status === 'completed' ? 'text-green-600' :
                task.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {task.status === 'completed' ? '已完成' :
                 task.status === 'pending' ? '待处理' : '已逾期'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">本周进度</h3>
        <div className="flex items-end space-x-2 h-32">
          {analyticsData.weeklyProgress.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${value}%` }}
              ></div>
              <span className="text-xs text-gray-600 mt-1">{['一', '二', '三', '四', '五', '六', '日'][index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">任务分类分布</h3>
        <div className="space-y-3">
          {analyticsData.categoryDistribution.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${category.color}`}></div>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color.replace('bg-', 'bg-')}`}
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{category.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">通知设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">邮件通知</div>
              <div className="text-sm text-gray-600">接收任务更新和提醒邮件</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">推送通知</div>
              <div className="text-sm text-gray-600">接收实时推送通知</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">主题设置</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-blue-500 rounded-lg p-4 text-center cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
            <div className="text-sm font-medium">蓝色主题</div>
          </div>
          <div className="border-2 border-transparent rounded-lg p-4 text-center cursor-pointer hover:border-gray-300">
            <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2"></div>
            <div className="text-sm font-medium">绿色主题</div>
          </div>
          <div className="border-2 border-transparent rounded-lg p-4 text-center cursor-pointer hover:border-gray-300">
            <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2"></div>
            <div className="text-sm font-medium">紫色主题</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">语言设置</h3>
        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* 头部导航 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">功能详情</h1>
          
          <button
            onClick={handleGoToMain}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            进入主应用
          </button>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📋 任务管理
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 数据分析
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ⚙️ 系统设置
            </button>
          </div>
        </div>

        {/* 内容区域 
            ### 这段代码做了什么
            - 容器样式: 外层 `div` 用 Tailwind 类（`bg-white rounded-lg shadow p-6`）渲染白色卡片、圆角、阴影和内边距。
            - 条件渲染: 三行使用 React 的短路与（`&&`）语法，根据 `activeTab` 的值选择性渲染对应内容：
              - 当 `activeTab === 'tasks'` 时，渲染 `renderTaskManagement()` 返回的 JSX。
              - 当 `activeTab === 'analytics'` 时，渲染 `renderAnalytics()`。
              - 当 `activeTab === 'settings'` 时，渲染 `renderSettings()`。
              - 条件为 `false` 时，`&&` 之后不会渲染任何内容（即不输出）。
            - 状态来源: `activeTab` 在文件顶部通过 `useState('tasks')` 定义，并由上方的标签按钮（第 221-251 行）调用 `setActiveTab(...)` 切换。
            - 效果: 同一容器根据当前选中的标签，仅挂载并显示一个对应的内容块，其余不渲染，避免无关内容占用 DOM。
        */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'tasks' && renderTaskManagement()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
