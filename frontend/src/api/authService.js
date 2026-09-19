import axiosInstance from './axiosInstance';

export const signup = async (payload) => {
  const response = await axiosInstance.post('/auth/signup', payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await axiosInstance.post('/auth/login', payload);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await axiosInstance.patch('/auth/me', payload);
  return response.data;
};

export const changePassword = async (payload) => {
  const response = await axiosInstance.patch('/auth/change-password', payload);
  return response.data;
};
