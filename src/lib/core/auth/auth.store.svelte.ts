import type { User } from './auth.types';
import { loginApi, getUserProfileApi } from './auth.api';

const SESSION_KEY = 'edurapat_session';
const TOKEN_KEY = 'auth_token';

let currentUser = $state<User | null>(null);
let isLoading = $state(false);

function saveSession(user: User, token: string) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(user));
	localStorage.setItem(TOKEN_KEY, token);
}

function clearSession() {
	localStorage.removeItem(SESSION_KEY);
	localStorage.removeItem(TOKEN_KEY);
}

function getStoredSession(): User | null {
	try {
		const stored = localStorage.getItem(SESSION_KEY);
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
}

export const authStore = {
	get currentUser() {
		return currentUser;
	},
	get isAuthenticated() {
		return currentUser !== null;
	},
	get isLoading() {
		return isLoading;
	},

	async login(nomorInduk: string, password: string): Promise<{ success: boolean; error?: string }> {
		isLoading = true;
		try {
			const res = await loginApi(nomorInduk, password);
			if (res) {
				currentUser = res.user;
				saveSession(res.user, res.access_token);
				return { success: true };
			}
			return { success: false, error: 'Nomor Induk atau password salah' };
		} catch {
			return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' };
		} finally {
			isLoading = false;
		}
	},

	logout() {
		currentUser = null;
		clearSession();
	},

	checkSession() {
		const stored = getStoredSession();
		if (stored) {
			currentUser = stored;
			// Refresh user profile asynchronously from server to ensure data is dynamic & up-to-date
			getUserProfileApi().then((freshUser) => {
				if (freshUser) {
					currentUser = freshUser;
					const token = localStorage.getItem(TOKEN_KEY) || '';
					saveSession(freshUser, token);
				}
			}).catch((err) => {
				console.error('Failed to refresh user profile from server:', err);
			});
		}
	}
};

