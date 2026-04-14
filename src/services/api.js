import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (email, password) => {
    return api.post('users/login/', { email, password });
};

export const register = (userData) => {
    return api.post('users/register/', userData);
};

export const getProducts = () => {
    return api.get('products/');
};

export const getProduct = (slug) => {
    return api.get(`products/${slug}/`);
};

export default api;
