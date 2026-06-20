import axios from 'axios';

export const http = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000
});

// Request interceptor - ready for auth token injection
http.interceptors.request.use(
	(config) => {
		// const token = localStorage.getItem('auth_token');
		// if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - ready for error handling
http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized - redirect to login
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
