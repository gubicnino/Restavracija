import api from './api';

// Login
export const login = (credentials) => {
  return api.post('/api/auth/login.php', credentials).then(res => res.data);
};

// Register
export const register = (userData) => {
  return api.post('/api/auth/register.php', userData).then(res => res.data);
};

// Logout
export const logout = () => {
  api.post('/api/auth/logout.php').then(res => res.data);
  clearUserFromStorage();
};

export const verifyCode = (code, userId) => {
  return api.post('/api/auth/verify_code.php', { code, user_id: userId }).then(res => res.data);
}

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