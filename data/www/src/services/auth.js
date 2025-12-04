import api from './api';

// Login
export const login = (credentials) => 
  api.post('/api/login.php', credentials).then(res => res.data);

// Register
export const register = (userData) => 
  api.post('/api/register.php', userData).then(res => res.data);

// Logout
export const logout = () => 
  api.post('/api/logout.php').then(res => res.data);

// Check authentication status
export const checkAuth = () => 
  api.get('/api/check.php').then(res => res.data);


export const saveUserToStorage = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};
export const loadUserFromStorage = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const clearUserFromStorage = () => {
  localStorage.removeItem('currentUser');
};