export interface User {
	id: string;
	name: string;
	nig: string;
	phone: string;
	subjects: string[];
	title: 'Bapak' | 'Ibu';
	avatarUrl?: string;
}
