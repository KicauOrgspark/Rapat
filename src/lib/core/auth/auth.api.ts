import { http } from '../api/http';
import type { LoginResponse, User } from './auth.types';

export async function loginApi(
	nomor_induk: string,
	password: string
): Promise<LoginResponse['data'] | null> {
	try {
		const response = await http.post<LoginResponse>('/auth/login', {
			nomor_induk,
			password
		});

		if (response.status === 200 && response.data?.data) {
			return response.data.data;
		}
		return null;
	} catch (error) {
		console.error('Login error:', error);
		return null;
	}
}

export async function getUserProfileApi(): Promise<User | null> {
	try {
		const response = await http.get<{ Message: string; data: User }>('/auth/me');
		if (response.status === 200 && response.data?.data) {
			return response.data.data;
		}
		return null;
	} catch (error) {
		console.error('Fetch profile error:', error);
		return null;
	}
}


