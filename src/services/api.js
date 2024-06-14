import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAllInvestments = async () => {
  const response = await api.get('/investments');
  return response.data;
};

export const createInvestment = async (investment) => {
  const response = await api.post('/investments', investment);
  return response.data;
};

export const updateInvestment = async (id, investment) => {
  const response = await api.put(`/investments/${id}`, investment);
  return response.data;
};

export const deleteInvestment = async (id) => {
  const response = await api.delete(`/investments/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;