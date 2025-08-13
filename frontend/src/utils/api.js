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

export default api;
