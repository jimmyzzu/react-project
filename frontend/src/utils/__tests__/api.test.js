import api from '../api';

// Mock axios
jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };
  return mockAxios;
});

describe('API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates axios instance with correct baseURL', () => {
    const axios = require('axios');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8008/api'
    });
  });

  test('sets up request and response interceptors', () => {
    const axios = require('axios');
    expect(axios.create().interceptors.request.use).toHaveBeenCalled();
    expect(axios.create().interceptors.response.use).toHaveBeenCalled();
  });
});
