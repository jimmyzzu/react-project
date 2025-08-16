import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8008/api',
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('API 请求:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      params: config.params
    });
    return config;
  },
  (error) => {
    console.error('API 请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API 响应成功:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API 响应错误:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// 任务相关API
export const tasksApi = {
  // 获取所有任务
  getAll: () => api.get('/tasks'),
  
  // 创建任务
  create: (taskData) => api.post('/tasks', taskData),
  
  // 更新任务
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  
  // 删除任务
  delete: (id) => api.delete(`/tasks/${id}`),
  
  // 获取任务统计
  getStats: () => api.get('/tasks/stats'),
  
  // 获取最近任务
  getRecent: (limit = 5) => api.get('/tasks/recent', { params: { limit } }),
  
  // 获取任务分类分布
  getCategories: () => api.get('/tasks/categories'),
  
  // 获取本周进度
  getWeeklyProgress: () => api.get('/tasks/weekly-progress')
};

export default api;
