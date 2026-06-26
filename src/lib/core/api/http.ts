import axios from 'axios';

export const http = axios.create({
	baseURL: 'https://api-rapatsmkpluspnb.reihan.biz.id/api/v1',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	timeout: 10000
});

// Request interceptor - token injection
http.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('auth_token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - ready for error handling
http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
				localStorage.removeItem('auth_token');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

