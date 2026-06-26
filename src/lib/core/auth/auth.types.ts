export interface User {
	id: number;
	name: string;
	nomor_induk: number | string;
	nig?: string | number;
	role: string;
	phone?: string;
	subjects?: string[];
	title?: 'Bapak' | 'Ibu';
	avatarUrl?: string;
}

export interface LoginResponse {
	message: string;
	data: {
		access_token: string;
		user: User;
	};
}
