import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Personal Info
export const getPersonalInfo = async () => {
  const response = await apiClient.get('/personal-info');
  return response.data;
};

// Experience
export const getExperience = async () => {
  const response = await apiClient.get('/experience');
  return response.data;
};

// Projects
export const getProjects = async (status = null) => {
  const params = status ? { status } : {};
  const response = await apiClient.get('/projects', { params });
  return response.data;
};

// Skills
export const getSkills = async () => {
  const response = await apiClient.get('/skills');
  return response.data;
};

// Education
export const getEducation = async () => {
  const response = await apiClient.get('/education');
  return response.data;
};

// Certifications
export const getCertifications = async () => {
  const response = await apiClient.get('/certifications');
  return response.data;
};

// Languages
export const getLanguages = async () => {
  const response = await apiClient.get('/languages');
  return response.data;
};

// Contact
export const submitContact = async (contactData) => {
  const response = await apiClient.post('/contact', contactData);
  return response.data;
};

// Project Management
export const createProject = async (projectData) => {
  const response = await apiClient.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await apiClient.put(`/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await apiClient.delete(`/projects/${projectId}`);
  return response.data;
};

// Profile Photo
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/upload-profile-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default apiClient;
