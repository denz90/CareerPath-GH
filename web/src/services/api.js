import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth-token='))
      ?.split('=')[1];
    
    if (token && token !== 'mock-session-token') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email, password, fullName) => {
  const response = await api.post('/auth/register', { 
    email, 
    password, 
    full_name: fullName 
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const getUniversities = async (type = null) => {
  const url = type ? `/universities/?type=${type}` : '/universities/';
  const response = await api.get(url);
  return response.data;
};

export const getProgrammes = async (field = null) => {
  const url = field ? `/programmes/?field_category=${field}` : '/programmes/';
  const response = await api.get(url);
  return response.data;
};

export const getProgramme = async (id) => {
  const response = await api.get(`/programmes/${id}`);
  return response.data;
};

export const getProgrammeUniversities = async (id) => {
  const response = await api.get(`/programmes/${id}/universities`);
  return response.data;
};

export const getQuestions = async () => {
  const response = await api.get('/assessments/questions');
  return response.data;
};

export const getRecommendations = async (riasecScores, coreGrades, electiveGrades) => {
  const response = await api.post('/recommendations/calculate', {
    riasec_scores: riasecScores,
    core_grades: coreGrades,
    elective_grades: electiveGrades,
  });
  return response.data;
};

export default api;
