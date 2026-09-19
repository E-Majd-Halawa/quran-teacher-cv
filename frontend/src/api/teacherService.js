import axiosInstance from './axiosInstance';

export const getTeacherProfile = async () => {
  const response = await axiosInstance.get('/quran-teacher/profile');
  return response.data;
};

export const createBookingRequest = async (payload) => {
  const response = await axiosInstance.post('/quran-teacher/sessions', payload);
  return response.data;
};

export const getMySessions = async () => {
  const response = await axiosInstance.get('/quran-teacher/sessions/my');
  return response.data;
};

export const deleteSession = async (id) => {
  const response = await axiosInstance.delete(`/quran-teacher/sessions/${id}`);
  return response.data;
};

export const updateSessionStatus = async (id, payload) => {
  const response = await axiosInstance.patch(`/quran-teacher/sessions/${id}`, payload);
  return response.data;
};

export const getAllSessions = async () => {
  const response = await axiosInstance.get('/quran-teacher/sessions');
  return response.data;
};

export const replyToSession = async (id, adminReply) => {
  const response = await axiosInstance.patch(`/quran-teacher/sessions/${id}/reply`, { adminReply });
  return response.data;
};

export const getMyNotifications = async () => {
  const response = await axiosInstance.get('/quran-teacher/sessions/notifications/my');
  return response.data;
};

export const markReplySeen = async (id) => {
  const response = await axiosInstance.patch(`/quran-teacher/sessions/${id}/seen`);
  return response.data;
};
