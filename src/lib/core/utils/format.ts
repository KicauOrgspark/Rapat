export function formatName(title: string, name: string): string {
	const prefix = title.toLowerCase() === 'ibu' ? 'Bu' : 'Pak';
	return `${prefix} ${name}`;
}

export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trimEnd() + '...';
}

export function getInitials(name: string): string {
	return name
		.split(' ')
		.filter((part) => part.length > 0)
		.slice(0, 2)
		.map((part) => part[0].toUpperCase())
		.join('');
}
