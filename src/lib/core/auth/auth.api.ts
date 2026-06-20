import type { User } from './auth.types';

const MOCK_USER: User = {
	id: 'usr_001',
	name: 'Sari Dewi, S.Pd.',
	nig: '198501012010012001',
	phone: '081234567890',
	subjects: ['Matematika', 'IPA'],
	title: 'Ibu'
};

const MOCK_PASSWORD = 'guru123';

export async function loginApi(nig: string, password: string): Promise<User | null> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	if (nig === MOCK_USER.nig && password === MOCK_PASSWORD) {
		return MOCK_USER;
	}
	return null;
}
