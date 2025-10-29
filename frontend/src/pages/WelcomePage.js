import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonDiy from '../components/ButtonDiy';

function WelcomePage() {
  const navigate = useNavigate();

  const handleNext = () => { navigate('/details'); };
  const goCalendar = () => { navigate('/calendar'); };
  const goKanban = () => { navigate('/kanban'); };

  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              欢迎来到任务管理系统
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              这是一个功能强大的任务管理平台，帮助您高效地组织和跟踪您的任务。
              点击下方按钮开始探索我们的核心功能模块。
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-blue-50 rounded-lg p-4 flex-1">
                <div className="text-blue-600 text-2xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-800">任务管理</h3>
                <p className="text-sm text-gray-600">创建、编辑和跟踪任务</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1">
                <div className="text-green-600 text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800">数据分析</h3>
                <p className="text-sm text-gray-600">查看任务完成情况统计</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 flex-1">
                <div className="text-purple-600 text-2xl mb-2">⚙️</div>
                <h3 className="font-semibold text-gray-800">系统设置</h3>
                <p className="text-sm text-gray-600">个性化配置和偏好设置</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-base transition-all shadow">
                功能详情 →
              </button>
              <button onClick={goCalendar} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl text-base transition-all shadow">
                日历视图
              </button>
              <button onClick={goKanban} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl text-base transition-all shadow">
                看板视图
              </button>
            </div>
            <div>
              <ButtonDiy onClick={handleClick}>click me</ButtonDiy>
              <ButtonDiy onClick={handleClick} disabled>Disabled Buttone</ButtonDiy>
              <ButtonDiy onClick={handleClick} type='submit'>Submit</ButtonDiy>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
