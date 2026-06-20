import type { User } from './auth.types';
import { loginApi } from './auth.api';

const SESSION_KEY = 'edurapat_session';

let currentUser = $state<User | null>(null);
let isLoading = $state(false);

function saveSession(user: User) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
	localStorage.removeItem(SESSION_KEY);
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

	async login(nig: string, password: string): Promise<{ success: boolean; error?: string }> {
		isLoading = true;
		try {
			const user = await loginApi(nig, password);
			if (user) {
				currentUser = user;
				saveSession(user);
				return { success: true };
			}
			return { success: false, error: 'NIG atau password salah' };
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
		}
	}
};
