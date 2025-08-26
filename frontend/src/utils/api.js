import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8009/api',
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
    const wrapped = response?.data;
    // 兼容 ResponseDto<T> 与原始数据
    const isWrapped = wrapped && typeof wrapped === 'object' && ('status' in wrapped) && ('data' in wrapped);
    const next = {
      ...response,
      data: isWrapped ? wrapped.data : wrapped,
    };
    console.log('API 响应成功:', {
      status: response.status,
      url: response.config.url,
      wrappedStatus: isWrapped ? wrapped.status : 'raw',
      msg: isWrapped ? wrapped.msg : undefined,
    });
    return next;
  },
  (error) => {
    const wrapped = error.response?.data;
    const msg = wrapped && typeof wrapped === 'object' && 'msg' in wrapped ? wrapped.msg : error.message;
    console.error('API 响应错误:', {
      status: error.response?.status,
      url: error.config?.url,
      message: msg,
    });
    return Promise.reject(error);
  }
);

// 任务相关API
export const tasksApi = {
  // 获取所有任务（分页）
  getAllPaged: ({ pageNo = 1, pageSize = 5 } = {}) => api.get('/tasks', { params: { pageNo, pageSize } }),
  
  // 获取某用户（owner）可见任务（已审批通过）
  getByOwnerApproved: (owner) => api.post('/tasks/query', { owner }),

  // 审核员分页查看审核中的任务，默认只看 processing
  getForReviewerPaged: ({ pageNo = 1, pageSize = 5, status = 'processing' } = {}) =>
    api.post('/tasks/query', { role: 'reviewer', status, pageNo, pageSize }),
  
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

export const eventsApi = {
  sendTaskEvent: (payload) => api.post('/events/task', payload),
};

export const approvalsApi = {
  submit: ({ taskId, reviewer, comment }) => api.post('/approvals/submit', { taskId, reviewer, comment }),
  changeStatus: (id, { status, comment }) => api.post(`/approvals/${id}/status`, { status, comment }),
  listByTask: (taskId) => api.get(`/approvals/task/${taskId}`),
};

export const llmApi = {
  complete: (text) => api.post('/llm/complete', { text }),
};

export default api;
