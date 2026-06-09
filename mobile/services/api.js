import axios from 'axios';
import { Platform } from 'react-native';

// For physical devices (Expo Go), use your computer's local IP address
// Detected Local IP: 10.63.34.158
const LOCAL_IP = '10.63.34.158';
const PORT = '8002';

const API_URL = Platform.select({
  android: `http://10.0.2.2:${PORT}`, // Android Emulator
  ios: `http://localhost:${PORT}`,      // iOS Simulator
  default: `http://${LOCAL_IP}:${PORT}`, // Physical Device
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  const payload = {
    riasec_scores: riasecScores,
    core_grades: coreGrades,
    elective_grades: electiveGrades,
  };
  
  const response = await api.post('/recommendations/calculate', payload);
  return response.data;
};

export const getNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

export default api;
